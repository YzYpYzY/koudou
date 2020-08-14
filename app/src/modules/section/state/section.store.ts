import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SectionState, SectionStateDefault } from './section.state';
import { SectionApiService } from '../section-api.service';
import { SectionActions } from './section.actions';
import { ISection } from '../models/ISection';
import { IListResponse } from '@core/models/IListResponse';

@Injectable()
@State<SectionState>({
    name: 'section',
    defaults: SectionStateDefault,
})
export class SectionStore {
    @Selector()
    static sections$(state: SectionState) {
        return state.sections;
    }
    @Selector()
    static sectionsCount$(state: SectionState) {
        return state.sectionsCount;
    }
    @Selector()
    static selectedSection$(state: SectionState) {
        return state.selectedSection;
    }
    @Selector()
    static selectedSectionId$(state: SectionState) {
        return state.selectedSectionId;
    }
    @Selector()
    static error$(state: SectionState) {
        return state.error;
    }
    @Selector()
    static state$(state: SectionState) {
        return state.viewState;
    }
    @Selector()
    static isSectionLoading$(state: SectionState) {
        return state.isSectionLoading;
    }
    constructor(private sectionApiService: SectionApiService) {}

    @Action(SectionActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<SectionState>,
        { request }: SectionActions.FetchAll,
    ) {
        patchState({
            isSectionLoading: true,
        });
        return this.sectionApiService.fetchAll(request).pipe(
            tap((res: IListResponse<ISection>) => {
                patchState({
                    sections: res.values,
                    sectionsCount: res.totalCount,
                    isSectionLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isSectionLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(SectionActions.Select)
    select(
        { patchState }: StateContext<SectionState>,
        { sectionId }: SectionActions.Select,
    ) {
        patchState({
            selectedSectionId: sectionId,
            selectedSection: null,
        });
    }

    @Action(SectionActions.Save)
    save(
        { patchState }: StateContext<SectionState>,
        { section }: SectionActions.Save,
    ) {
        patchState({
            isSectionLoading: true,
        });
        if (section.id) {
            return this.sectionApiService.update(section.id, section).pipe(
                tap((res: ISection) => {
                    patchState({
                        selectedSectionId: section.id,
                        selectedSection: res,
                        isSectionLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isSectionLoading: false,
                    });
                    return of(error);
                }),
            );
        } else {
            return this.sectionApiService.create(section).pipe(
                tap((res: ISection) => {
                    patchState({
                        selectedSectionId: section.id,
                        selectedSection: res,
                        isSectionLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isSectionLoading: false,
                    });
                    return of(error);
                }),
            );
        }
    }

    @Action(SectionActions.Delete)
    delete(
        { patchState }: StateContext<SectionState>,
        { sectionId }: SectionActions.Delete,
    ) {
        patchState({
            isSectionLoading: true,
        });
        return this.sectionApiService.remove(sectionId).pipe(
            tap(() => {
                patchState({
                    selectedSectionId: null,
                    selectedSection: null,
                    sections: null,
                    sectionsCount: null,
                    isSectionLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isSectionLoading: false,
                });
                return of(error);
            }),
        );
    }
    @Action(SectionActions.SetViewState)
    setViewState(
        { patchState }: StateContext<SectionState>,
        { newState }: SectionActions.SetViewState,
    ) {
        patchState({
            viewState: newState,
        });
    }
}
