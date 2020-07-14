import { Component, OnInit } from '@angular/core';
import { CrudStates } from '@core/enums/CrudStates';
import {
    YzYSort,
    Column,
    FormModel,
    FieldTypes,
    YzYAction,
    BaseComponent,
    YzYActionTypes,
    AnswerType,
    Answer,
} from 'yzy-ng';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAlbum } from './models/IAlbum';
import { IListRequest } from '../../core/models/IListRequest';
import { AlbumService } from './state/album.service';

@Component({
    selector: 'koudou-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss'],
})
export class AlbumComponent extends BaseComponent implements OnInit {
    CrudStates = CrudStates;
    selectedAlbum$: Observable<IAlbum>;
    selectedAlbum: IAlbum;

    albums: IAlbum[] = [];
    albumsCount = 0;
    columns: Column[] = [
        { name: 'Titre', attribute: 'title' },
        { name: 'Date', attribute: 'date' },
        { name: 'Nombre de photos', attribute: 'photoCount' },
        { name: 'Créateur', attribute: 'creator' },
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
        { name: 'read', class: 'gg-search', type: YzYActionTypes.Info },
        { name: 'edit', class: 'gg-pen', type: YzYActionTypes.Warning },
    ];
    headerActions: YzYAction[] = [
        { name: 'add', class: 'gg-math-plus', type: YzYActionTypes.Success },
    ];
    state = CrudStates.List;
    request: IListRequest;
    itemByPage = 20;
    valuesForForm = null;
    albumIdForDelete: number = null;
    question = 'Ètes-vous certains de vouloir supprimer cet album ?';
    answer = [
        { label: 'Annuler', value: false, type: AnswerType.Default },
        { label: 'Oui', value: true, type: AnswerType.Danger },
    ];
    constructor(private albumService: AlbumService) {
        super();
        this.albumService.albums$
            .pipe(takeUntil(this.destroy$))
            .subscribe((albums) => {
                this.albums = albums;
            });
        this.albumService.selectedAlbum$
            .pipe(takeUntil(this.destroy$))
            .subscribe((album) => {
                this.selectedAlbum = album;
            });
        this.albumService.albumsCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((albumsCount) => (this.albumsCount = albumsCount));
        this.selectedAlbum$ = this.albumService.selectedAlbum$;
    }

    ngOnInit() {
        this.request = {
            sort: null,
            sortDirection: null,
            startIndex: 0,
            count: this.itemByPage,
            filter: null,
        };
        this.fetchAlbums();
    }

    add() {
        this.select(null);
        this.state = CrudStates.Create;
    }
    cancel() {
        this.state = CrudStates.List;
    }
    select(albumId: number) {
        this.albumService.select(albumId);
        this.state = CrudStates.Read;
    }
    save(album: IAlbum) {
        this.albumService.save(album);
        this.state = CrudStates.Read;
    }
    update() {
        this.state = CrudStates.Update;
    }
    delete(albumId: number): void {
        this.albumService.delete(albumId);
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
        this.fetchAlbums();
    }

    filterFormReady(form: FormGroup): void {
        form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((change) => {
            this.request.filter = change.filter;
            this.fetchAlbums();
        });
    }

    pageChange(newPage: number): void {
        this.request.startIndex = (newPage - 1) * this.itemByPage;
        this.fetchAlbums();
    }

    fetchAlbums(): void {
        this.albumService.fetchAll(this.request);
    }

    handleHeaderAction(action: YzYAction): void {
        if (action.name === 'add') {
            this.add();
        }
    }

    handleLineActions({ action, key }): void {
        switch (action.name) {
            case 'read':
                this.select(key);
                break;
            case 'edit':
                this.select(key);
                this.update();
                break;
            case 'delete':
                this.showDelete(key);
                break;
        }
    }

    confirmDelete(answer: Answer): void {
        if (answer.value) {
            this.delete(this.albumIdForDelete);
        }
        this.albumIdForDelete = null;
    }

    showDelete(albumId?: number): void {
        this.albumIdForDelete = albumId ? albumId : this.selectedAlbum.id;
    }
}
