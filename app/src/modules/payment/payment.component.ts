import { Component, OnInit } from '@angular/core';
import { CrudStates } from '@core/enums/CrudStates';
import {
    YzYSort,
    Column,
    FormModel,
    FieldTypes,
    YzYAction,
    YzYActionTypes,
    AnswerType,
    Answer,
    YzYActionEvent,
} from 'yzy-ng';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPayment } from './models/IPayment';
import { IListRequest } from '../../core/models/IListRequest';
import { PaymentService } from './state/payment.service';
import { PaymentTypePipe } from './pipes/payment-type.pipe';
import { BaseComponent } from '@core/base/base.component';
@Component({
    selector: 'koudou-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends BaseComponent implements OnInit {
    CrudStates = CrudStates;
    selectedPayment$: Observable<IPayment>;
    selectedPayment: IPayment;

    payments: any[] = [];
    paymentsCount = 0;
    columns: Column[] = [
        { name: 'Nom', attribute: 'name' },
        { name: 'Type', attribute: 'type' },
        { name: 'Montant', attribute: 'amount' },
        { name: 'Date limite', attribute: 'deadline' },
        { name: 'Nombre de paiements', attribute: 'countTotal' },
        { name: 'Paiements réglés', attribute: 'countPayed' },
    ];
    filtersModel: FormModel = {
        title: null,
        fields: [
            {
                name: 'filter',
                label: 'Rechercher',
                type: FieldTypes.Text,
            },
        ],
    };
    lineActions: YzYAction[] = [
        // { name: 'read', class: 'gg-search', type: YzYActionTypes.Info },
        // { name: 'edit', class: 'gg-pen', type: YzYActionTypes.Warning },
        // { name: 'delete', class: 'gg-trash', type: YzYActionTypes.Error },
    ];
    headerActions: YzYAction[] = [
        // { name: 'add', class: 'gg-math-plus', type: YzYActionTypes.Success },
    ];
    state = CrudStates.List;
    request: IListRequest;
    itemByPage = 20;
    paymentIdForDelete: number = null;
    question = 'Ètes-vous certains de vouloir supprimer cette payment ?';
    answer = [
        { label: 'Annuler', value: false, type: AnswerType.Default },
        { label: 'Oui', value: true, type: AnswerType.Danger },
    ];
    constructor(
        private paymentService: PaymentService,
        private paymentTypePipe: PaymentTypePipe,
    ) {
        super();
        this.paymentService.payments$
            .pipe(takeUntil(this.destroy$))
            .subscribe((payments) => {
                this.payments =
                    payments != null
                        ? payments.map((p) => ({
                              ...p,
                              type: this.paymentTypePipe.transform(p.type),
                          }))
                        : null;
            });
        this.paymentService.selectedPayment$
            .pipe(takeUntil(this.destroy$))
            .subscribe((payment) => {
                this.selectedPayment = payment;
            });
        this.paymentService.paymentsCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((paymentsCount) => (this.paymentsCount = paymentsCount));
        this.selectedPayment$ = this.paymentService.selectedPayment$;
    }

    ngOnInit() {
        this.request = {
            sort: null,
            sortDirection: null,
            startIndex: 0,
            count: this.itemByPage,
            filter: null,
        };
        this.fetchPayments();
    }

    add() {
        this.select(null);
        this.state = CrudStates.Create;
    }
    cancel() {
        this.state = CrudStates.List;
    }
    select(paymentId: number) {
        this.paymentService.select(paymentId);
        this.state = CrudStates.Read;
    }
    save(payment: IPayment) {
        this.paymentService.save(payment);
        this.state = CrudStates.Read;
    }
    update() {
        this.state = CrudStates.Update;
    }
    delete(paymentId: number): void {
        this.paymentService.delete(paymentId);
    }

    sort(newSort: YzYSort): void {
        if (newSort == null) {
            this.request.sort = null;
            this.request.sortDirection = null;
        } else {
            this.request.sort =
                newSort.attribute.charAt(0).toUpperCase() +
                newSort.attribute.slice(1);
            this.request.sortDirection = !newSort.isDesc ? 1 : 0;
        }
        this.fetchPayments();
    }

    filterFormReady(form: FormGroup): void {
        form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((change) => {
            this.request.filter = change.filter;
            this.fetchPayments();
        });
    }

    pageChange(newPage: number): void {
        this.request.startIndex = (newPage - 1) * this.itemByPage;
        this.fetchPayments();
    }

    fetchPayments(): void {
        this.paymentService.fetchAll(this.request);
    }

    handleHeaderAction(action: YzYAction): void {
        if (action.name === 'add') {
            this.add();
        }
    }

    handleLineActions({ action, key }: YzYActionEvent): void {
        switch (action.name) {
            case 'read':
                this.select(key as number);
                break;
            case 'edit':
                this.select(key as number);
                this.update();
                break;
            case 'delete':
                this.showDelete(key as number);
                break;
        }
    }

    confirmDelete(answer: Answer): void {
        if (answer.value) {
            this.delete(this.paymentIdForDelete);
        }
        this.paymentIdForDelete = null;
    }

    showDelete(paymentId?: number): void {
        this.paymentIdForDelete = paymentId
            ? paymentId
            : this.selectedPayment.id;
    }
}
