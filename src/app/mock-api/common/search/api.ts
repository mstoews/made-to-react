import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem, FuseNavigationService } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class SearchMockApi
{
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;

    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _fuseNavigationService: FuseNavigationService
    )
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // Get the flat navigation and store it
        const flatNavigation = this._fuseNavigationService.getFlatNavigation(this._defaultNavigation);

        // -----------------------------------------------------------------------------------------------------
        // @ Search results - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/common/search')
            .reply(({request}) => {

                // Get the search query
                const query = cloneDeep(request.body.query.toLowerCase());

                // If the search query is an empty string,
                // return an empty array
                if ( query === '' )
                {
                    return [200, {results: []}];
                }

                // Filter the contacts
                
                // Filter the navigation
                const pagesResults = cloneDeep(flatNavigation)
                    .filter(page => (page.title?.toLowerCase().includes(query) || (page.subtitle && page.subtitle.includes(query))));

                // Filter the tasks
                

                // Prepare the results array

            });
    }
}
