/// <reference path="../../../modules/Jasmine.d.ts" />
/// <reference path="../../../modules/Jasmine-jquery.d.ts" />
/// <reference path="../../../modules/Backbone.d.ts" />
/// <reference path="../../../modules/jquery.d.ts" />
/// <reference path="../../../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../../../SampleApp/models/ListItem.ts" />
/// <reference path="../../../SampleApp/models/ListItemCollection.ts" />
/// <reference path="../../../SampleApp/events/ListItemEvents.ts" />
/// <reference path="../../../SampleApp/services/IListItemService.ts" />
/// <reference path="../../../SampleApp/services/MockListItemService.ts" />
var MockListItemEventHandler = (function () {
    function MockListItemEventHandler() {
    }
    MockListItemEventHandler.prototype.handle_ListItemCollection_LoadedEvent = function (event) {
        this.ListItemCollection = event.ListItemCollection;
    };
    return MockListItemEventHandler;
})();

describe("SampleApp : tests : services : ListItemService_Tests ", function () {
    var mockListLitemHandler;

    beforeEach(function () {
        mockListLitemHandler = new MockListItemEventHandler();
        TypeScriptTinyIOC.registerHandler(mockListLitemHandler, new IIListItemCollection_LoadedEvent_Handler(), new IIListItemCollection_LoadedEvent());
    });

    afterEach(function () {
        TypeScriptTinyIOC.unregisterHandler(mockListLitemHandler, new IIListItemCollection_LoadedEvent());
    });

    it("MockListItemService should raise ListItemCollection_LoadedEvent", function () {
        var mockService = new MockListItemService();

        var eventHandler_Spy = spyOn(mockListLitemHandler, "handle_ListItemCollection_LoadedEvent");
        eventHandler_Spy.andCallThrough();

        mockService.loadListItems();

        expect(eventHandler_Spy).toHaveBeenCalled();
    });
});
