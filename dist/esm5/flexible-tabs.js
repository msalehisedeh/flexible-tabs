import { Component, Input, Output, ContentChildren, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

var FlexibleTabComponent = /** @class */ (function () {
    function FlexibleTabComponent() {
    }
    FlexibleTabComponent.prototype.templateContext = function () {
        return { data: this.sourceData };
    };
    return FlexibleTabComponent;
}());
FlexibleTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-tab',
                template: "\n<ng-container\n    *ngIf=\"selected && template\"\n    [ngTemplateOutlet]=\"template\"\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\n<ng-content *ngIf=\"selected && !template\"></ng-content>\n",
                styles: [":host{padding:0;margin:0;width:100%}"]
            },] },
];
FlexibleTabComponent.ctorParameters = function () { return []; };
FlexibleTabComponent.propDecorators = {
    "selected": [{ type: Input, args: ["selected",] },],
    "title": [{ type: Input, args: ["title",] },],
    "tabalticon": [{ type: Input, args: ["tabalticon",] },],
    "tabicon": [{ type: Input, args: ["tabicon",] },],
    "template": [{ type: Input, args: ["template",] },],
    "sourceData": [{ type: Input, args: ["data",] },],
};
var FlexibleTabsComponent = /** @class */ (function () {
    function FlexibleTabsComponent() {
        this.tabs = [];
        this.selectedIndex = -1;
        this.isIconified = false;
        this.message = "click to select tab ";
        this.onchange = new EventEmitter();
    }
    FlexibleTabsComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.forEach(function (tabInstance, index) {
            if (tabInstance.selected) {
                _this.selectedIndex = index;
            }
            _this.isIconified = true;
            if (tabInstance.tabicon || tabInstance.tabalticon) {
                _this.isIconified = true;
            }
            _this.tabs.push(tabInstance);
        });
    };
    FlexibleTabsComponent.prototype.keyup = function (event) {
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    FlexibleTabsComponent.prototype.selectTab = function (index) {
        this.tabs.map(function (tab) {
            tab.selected = false;
        });
        this.tabs[index].selected = true;
        this.selectedIndex = index;
        this.onchange.emit({
            selectedIndex: index,
            selectedTitle: this.tabs[index].title
        });
    };
    return FlexibleTabsComponent;
}());
FlexibleTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-tabs',
                template: "\n<div class=\"flexible-tabs {{type}} {{position}}\">\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'top' || position === 'left'\">\n        <a *ngFor=\"let tab of tabs; let i = index\"\n            role=\"listitem\"\n            tabindex=\"0\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"selectTab(i)\"\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\"\n            [class.selected]=\"tab.selected\">\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\n        </a>\n    </div>\n    <div class=\"tabs-viewport\">\n        <ng-content></ng-content>\n    </div>\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'bottom' || position === 'right'\">\n        <a *ngFor=\"let tab of tabs; let i = index\"\n            role=\"listitem\"\n            tabindex=\"0\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"selectTab(i)\"\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\"\n            [class.selected]=\"tab.selected\">\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\n        </a>\n    </div>\n</div>\n",
                styles: [".flexible-tabs{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px;min-height:150px}.flexible-tabs .tabs-control{z-index:2;-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse;display:-webkit-box;display:-ms-flexbox;display:flex}.flexible-tabs .tabs-control a{-webkit-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs.top{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{-ms-flex-wrap:wrap;flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{-ms-flex-wrap:wrap;flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{-ms-flex-wrap:wrap;flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{-ms-flex-wrap:wrap;flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.flexible-tabs.left.plain .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%;margin:5px 0}.flexible-tabs.left.radio .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 1%;flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;border:1px solid #ddd}.flexible-tabs.right{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.flexible-tabs.right.plain .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 1%;flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{-webkit-box-flex:0;-ms-flex:0 0 10%;flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{-webkit-box-flex:1;-ms-flex:1;flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
            },] },
];
FlexibleTabsComponent.ctorParameters = function () { return []; };
FlexibleTabsComponent.propDecorators = {
    "children": [{ type: ContentChildren, args: [FlexibleTabComponent,] },],
    "position": [{ type: Input, args: ["position",] },],
    "type": [{ type: Input, args: ["type",] },],
    "message": [{ type: Input, args: ["message",] },],
    "onchange": [{ type: Output, args: ['onchange',] },],
};
var FlexibleTabsModule = /** @class */ (function () {
    function FlexibleTabsModule() {
    }
    return FlexibleTabsModule;
}());
FlexibleTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    FlexibleTabsComponent,
                    FlexibleTabComponent
                ],
                exports: [
                    FlexibleTabsComponent,
                    FlexibleTabComponent
                ],
                entryComponents: [],
                providers: [],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
FlexibleTabsModule.ctorParameters = function () { return []; };

export { FlexibleTabComponent, FlexibleTabsComponent, FlexibleTabsModule };
//# sourceMappingURL=flexible-tabs.js.map