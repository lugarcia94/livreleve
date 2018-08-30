import { combineReducers } from 'redux';
import { menu, menuHasErrored, menuIsLoading, menuExpanded } from './menu';
import { minicart, minicartHasErrored, minicartIsLoading, minicartQtd, minicartExpanded, minicartItems, minicartIsRemove } from './minicart';
import { orderForm, firstSku } from './core';
import { giftlist } from "./giftlist";

import { relateds, paginateRelateds, loadingRelateds, searchRelateds, errorRelateds } from "./relatedSearch";

export default combineReducers({
    orderForm,
    firstSku,

    giftlist,

    menu,
    menuHasErrored,
    menuIsLoading,
    menuExpanded,

    minicart,
    minicartHasErrored,
    minicartIsLoading,
    minicartQtd,
    minicartExpanded,
    minicartItems,
    minicartIsRemove,

    relateds,
    paginateRelateds,
    loadingRelateds,
    searchRelateds,
    errorRelateds
});