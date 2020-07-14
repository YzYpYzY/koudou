import { CrudStates } from '@core/enums';
import { ISection } from './../models/ISection';
import { IListRequest } from '@core/models/IListRequest';

export interface SectionState {
    sections: ISection[];
    sectionsCount: number;
    selectedSectionId: number;
    selectedSection: ISection;
    request: IListRequest;
    error: any;
    viewState: CrudStates;
    isSectionLoading: boolean;
}

export const SectionStateDefault = {
    sections: null,
    sectionsCount: 0,
    selectedSectionId: null,
    selectedSection: null,
    request: null,
    error: null,
    viewState: CrudStates.List,
    isSectionLoading: false,
};
