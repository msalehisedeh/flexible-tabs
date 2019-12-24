import * as tslib_1 from "tslib";
/*
* Provides rendering of a table which is using the given FlexibleTableHeader set in
* order to tabulate the given data. As per definition of earch header component,
* a column could be hidden, sortable, or draggable. Each table row can expand/collapse
* or respond to a click action.
*/
import { Component, Input, Output, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef, Injector, ComponentFactoryResolver, EmbeddedViewRef, ElementRef, ApplicationRef, EventEmitter, Renderer2, OnInit } from '@angular/core';
export var TabTypes;
(function (TabTypes) {
    TabTypes["button"] = "button";
    TabTypes["tab"] = "tab";
    TabTypes["plain"] = "plain";
    TabTypes["icon"] = "icon";
    TabTypes["radio"] = "radio";
})(TabTypes || (TabTypes = {}));
export var TabPositions;
(function (TabPositions) {
    TabPositions["top"] = "top";
    TabPositions["left"] = "left";
    TabPositions["right"] = "right";
    TabPositions["bottom"] = "bottom";
})(TabPositions || (TabPositions = {}));
var FlexibleTabComponent = /** @class */ (function () {
    function FlexibleTabComponent(componentFactoryResolver, host, appRef, injector, renderer, detector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.host = host;
        this.appRef = appRef;
        this.injector = injector;
        this.renderer = renderer;
        this.detector = detector;
        this.hovered = false;
        this.selected = false;
    }
    FlexibleTabComponent.prototype.ngOnInit = function () {
        this.renderer.setAttribute(this.host.nativeElement, 'id', this.flexibleId + '-panel-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'aria-labelledby', this.flexibleId + '-tab-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'role', "tabpanel");
        this.renderer.setAttribute(this.host.nativeElement, 'aria-labeledby', this.flexibleId + '-tab-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'aria-hidden', this.selected ? 'false' : 'true');
        this.host.nativeElement.style.display = "selected ? 'block':'none'";
    };
    FlexibleTabComponent.prototype.templateContext = function () {
        return { data: this.sourceData };
    };
    FlexibleTabComponent.prototype.deactivate = function (deselect) {
        if (deselect) {
            this.renderer.setAttribute(this.host.nativeElement, 'tabIndex', '-1');
            this.renderer.setStyle(this.host.nativeElement, 'display', 'none');
            if (this.selected) {
                this.selected = false;
                if (this.dynamicComponent) {
                    var instance = this.dynamicComponent.instance;
                    instance.deactivate();
                }
            }
        }
        this.hovered = false;
        this.detector.detectChanges();
    };
    FlexibleTabComponent.prototype.activate = function () {
        if (!this.selected) {
            this.selected = true;
            this.detector.detectChanges();
            this.renderer.setAttribute(this.host.nativeElement, 'tabIndex', '0');
            this.renderer.setStyle(this.host.nativeElement, 'display', 'block');
            if (this.component) {
                this.initializeDynamicComponent();
                var instance = this.dynamicComponent.instance;
                instance.activate(this.sourceData, this.template, this.handler);
            }
        }
    };
    FlexibleTabComponent.prototype.hover = function (flag) {
        this.hovered = flag;
        this.detector.detectChanges();
    };
    FlexibleTabComponent.prototype.initializeDynamicComponent = function () {
        if (!this.dynamicComponent) {
            this.dynamicComponent = this.componentFactoryResolver
                .resolveComponentFactory(this.component)
                .create(this.injector);
            this.appRef.attachView(this.dynamicComponent.hostView);
            this.host.nativeElement.appendChild(this.dynamicComponent.hostView.rootNodes[0]);
        }
    };
    FlexibleTabComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ElementRef },
        { type: ApplicationRef },
        { type: Injector },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    tslib_1.__decorate([
        Input("selected")
    ], FlexibleTabComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        Input("title")
    ], FlexibleTabComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input("component")
    ], FlexibleTabComponent.prototype, "component", void 0);
    tslib_1.__decorate([
        Input("tabalticon")
    ], FlexibleTabComponent.prototype, "tabalticon", void 0);
    tslib_1.__decorate([
        Input("tabicon")
    ], FlexibleTabComponent.prototype, "tabicon", void 0);
    tslib_1.__decorate([
        Input("template")
    ], FlexibleTabComponent.prototype, "template", void 0);
    tslib_1.__decorate([
        Input("data")
    ], FlexibleTabComponent.prototype, "sourceData", void 0);
    tslib_1.__decorate([
        Input("handler")
    ], FlexibleTabComponent.prototype, "handler", void 0);
    FlexibleTabComponent = tslib_1.__decorate([
        Component({
            selector: 'flexible-tab',
            template: "<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template && !component\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template && !component\"></ng-content>\r\n",
            styles: [":host{padding:10px;margin:0;width:100%;display:block;box-sizing:border-box}:host:focus{outline:0}"]
        })
    ], FlexibleTabComponent);
    return FlexibleTabComponent;
}());
export { FlexibleTabComponent };
var FlexibleTabsComponent = /** @class */ (function () {
    function FlexibleTabsComponent() {
        this.tabs = [];
        this.selectedIndex = -1;
        this.isIconified = false;
        this.popped = false;
        this.position = TabPositions.top;
        this.type = TabTypes.tab;
        this.pophover = false;
        this.message = "Click to select tab. Use arrow keys to navigate to other tabs.";
        this.flexibleId = '';
        this.collapsed = false;
        this.onchange = new EventEmitter();
    }
    FlexibleTabsComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        var defaultIndex = this.pophover ? -1 : 0;
        this.tabs = [];
        this.isIconified = false;
        this.children.forEach(function (tabInstance, index) {
            tabInstance.index = index;
            tabInstance.flexibleId = _this.flexibleId;
            if (tabInstance.selected) {
                defaultIndex = index;
            }
            _this.isIconified = true;
            if (tabInstance.tabicon || tabInstance.tabalticon) {
                _this.isIconified = true;
            }
            _this.tabs.push(tabInstance);
        });
        if (this.tabs.length) {
            this.selectTab(defaultIndex);
        }
        else {
            this.selectedIndex = defaultIndex;
        }
    };
    FlexibleTabsComponent.prototype.keyup = function (event, index) {
        var code = event.which;
        var id = undefined;
        if (code === 13) {
            event.target.click();
        }
        else if (code === 37 && (this.position === 'top' || this.position === 'bottom')) { // left arrow
            id = document.getElementById(this.flexibleId + '-tab-' + (index - 1));
        }
        else if (code === 39 && (this.position === 'top' || this.position === 'bottom')) { // rght arrow
            id = document.getElementById(this.flexibleId + '-tab-' + (index + 1));
        }
        else if (code === 38 && (this.position === 'left' || this.position === 'right')) { // up arrow
            id = document.getElementById(this.flexibleId + '-tab-' + (index + 1));
        }
        else if (code === 40 && (this.position === 'left' || this.position === 'right')) { // down arrow
            id = document.getElementById(this.flexibleId + '-tab-' + (index - 1));
        }
        if (id) {
            event.preventDefault();
            event.stopPropagation();
            id.focus();
            return false;
        }
    };
    FlexibleTabsComponent.prototype.selectTab = function (index) {
        if (this.selectedIndex != index) {
            this.tabs.map(function (tab) {
                tab.deactivate(true);
            });
            if (index > -1) {
                this.tabs[index].activate();
                this.selectedIndex = index;
                this.popped = true;
                this.onchange.emit({
                    selectedIndex: index,
                    selectedTitle: this.tabs[index].title
                });
            }
        }
    };
    FlexibleTabsComponent.prototype.hoverTab = function (index, flag) {
        if (this.pophover) {
            this.tabs.map(function (tab) {
                tab.deactivate(false);
            });
            if (index > -1) {
                this.tabs[index].hover(flag);
            }
            this.popped = this.selectedIndex > -1 || flag;
        }
    };
    tslib_1.__decorate([
        ContentChildren(FlexibleTabComponent)
    ], FlexibleTabsComponent.prototype, "children", void 0);
    tslib_1.__decorate([
        Input("position")
    ], FlexibleTabsComponent.prototype, "position", void 0);
    tslib_1.__decorate([
        Input("type")
    ], FlexibleTabsComponent.prototype, "type", void 0);
    tslib_1.__decorate([
        Input("pophover")
    ], FlexibleTabsComponent.prototype, "pophover", void 0);
    tslib_1.__decorate([
        Input("message")
    ], FlexibleTabsComponent.prototype, "message", void 0);
    tslib_1.__decorate([
        Input("flexibleId")
    ], FlexibleTabsComponent.prototype, "flexibleId", void 0);
    tslib_1.__decorate([
        Input("collapsed")
    ], FlexibleTabsComponent.prototype, "collapsed", void 0);
    tslib_1.__decorate([
        Output('onchange')
    ], FlexibleTabsComponent.prototype, "onchange", void 0);
    FlexibleTabsComponent = tslib_1.__decorate([
        Component({
            selector: 'flexible-tabs',
            template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div *ngIf=\"position === 'top' || position === 'left'\"\r\n        [attr.aria-orientation]=\"position === 'left' ?  'vertical' : 'horizontal'\"\r\n        [class.collapsed]=\"collapsed\" \r\n        class=\"tabs-control\" \r\n        role=\"tablist\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"tab\" \r\n            (keyup)=\"keyup($event, i)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n\t\t\t[id]=\"flexibleId + '-tab-' + i\" \r\n            [attr.tabindex]=\"tab.selected ? 0 : -1\"\r\n            [attr.aria-controls]=\"flexibleId + '-panel-' + i\" \r\n            [attr.aria-selected]=\"tab.selected ? true:false\" \r\n            [attr.aria-posinset]=\"i+1\" \r\n            [attr.aria-setsize]=\"tabs.length\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\"  [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div \r\n        class=\"tabs-viewport\" \r\n        role=\"tabpanel\"\r\n        [class.popper]=\"pophover\" \r\n        [class.pop]=\"popped\" \r\n        (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div *ngIf=\"position === 'bottom' || position === 'right'\"\r\n        [class.collapsed]=\"collapsed\" \r\n        [attr.aria-orientation]=\"position === 'right' ? 'vertical' : 'horizontal'\"\r\n        class=\"tabs-control\" \r\n        role=\"tablist\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"tab\" \r\n            (keyup)=\"keyup($event, i)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [id]=\"flexibleId + '-tab-' + i\" \r\n            [attr.tabindex]=\"tab.selected ? 0 : -1\"\r\n            [attr.aria-controls]=\"flexibleId + '-panel-' + i\" \r\n            [attr.aria-selected]=\"tab.selected ? true:false\" \r\n            [attr.aria-posinset]=\"i+1\" \r\n            [attr.aria-setsize]=\"tabs.length\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\"  [class]=\"tab.tabalticon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
            styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;min-height:150px;display:flex;align-items:stretch}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;min-width:27px;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs .tabs-control a.icon :before{display:block}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
        })
    ], FlexibleTabsComponent);
    return FlexibleTabsComponent;
}());
export { FlexibleTabsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUudGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtdGFicy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtdGFicy9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0VBS0U7QUFDRixPQUFPLEVBQ0gsU0FBUyxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sZUFBZSxFQUNmLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUix3QkFBd0IsRUFDeEIsZUFBZSxFQUNmLFVBQVUsRUFDUCxjQUFjLEVBQ2pCLFlBQVksRUFDWixTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE1BQU0sQ0FBTixJQUFZLFFBTVg7QUFORCxXQUFZLFFBQVE7SUFDbkIsNkJBQWlCLENBQUE7SUFDakIsdUJBQVcsQ0FBQTtJQUNYLDJCQUFlLENBQUE7SUFDZix5QkFBYSxDQUFBO0lBQ2IsMkJBQWUsQ0FBQTtBQUNoQixDQUFDLEVBTlcsUUFBUSxLQUFSLFFBQVEsUUFNbkI7QUFFRCxNQUFNLENBQU4sSUFBWSxZQUtYO0FBTEQsV0FBWSxZQUFZO0lBQ3ZCLDJCQUFXLENBQUE7SUFDWCw2QkFBYSxDQUFBO0lBQ2IsK0JBQWUsQ0FBQTtJQUNmLGlDQUFpQixDQUFBO0FBQ2xCLENBQUMsRUFMVyxZQUFZLEtBQVosWUFBWSxRQUt2QjtBQXdCRDtJQStCSSw4QkFDTSx3QkFBa0QsRUFDbEQsSUFBZ0IsRUFDaEIsTUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsUUFBbUIsRUFDbkIsUUFBMkI7UUFMM0IsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFB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ckY7UUFEQyxLQUFLLENBQUMsWUFBWSxDQUFDOzZEQUNHO0lBR3ZCO1FBREMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs0REFDTTtJQUd6QjtRQURDLE1BQU0sQ0FBQyxVQUFVLENBQUM7MkRBQ21CO0lBNUIxQixxQkFBcUI7UUFMakMsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGVBQWU7WUFDekIsaThIQUE2Qzs7U0FFN0MsQ0FBQztPQUNXLHFCQUFxQixDQXlHakM7SUFBRCw0QkFBQztDQUFBLEFBekdELElBeUdDO1NBekdZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0Q29udGVudENoaWxkcmVuLFxyXG5cdFF1ZXJ5TGlzdCxcclxuXHRBZnRlckNvbnRlbnRJbml0LFxyXG5cdENoYW5nZURldGVjdG9yUmVmLFxyXG5cdEluamVjdG9yLFxyXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuXHRFbWJlZGRlZFZpZXdSZWYsXHJcblx0RWxlbWVudFJlZixcclxuICAgIEFwcGxpY2F0aW9uUmVmLFxyXG5cdEV2ZW50RW1pdHRlcixcclxuXHRSZW5kZXJlcjIsXHJcblx0T25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgZW51bSBUYWJUeXBlcyB7XHJcblx0YnV0dG9uID0gXCJidXR0b25cIiwgXHJcblx0dGFiID0gXCJ0YWJcIiwgXHJcblx0cGxhaW4gPSBcInBsYWluXCIsIFxyXG5cdGljb24gPSBcImljb25cIiwgXHJcblx0cmFkaW8gPSBcInJhZGlvXCJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVGFiUG9zaXRpb25zIHtcclxuXHR0b3AgPSBcInRvcFwiLCBcclxuXHRsZWZ0ID0gXCJsZWZ0XCIsIFxyXG5cdHJpZ2h0ID0gXCJyaWdodFwiLCBcclxuXHRib3R0b20gPSBcImJvdHRvbVwiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRHluYW1pY1RhYkNvbnRlbnRDb21wb25lbnQge1xyXG4gIC8qXHJcbiAgICogV2lsbCBhY3RpdmF0ZSB0aGUgY29tcG9uZW50IHdpdGggZ2l2ZW4gZGF0YS5cclxuICAgKiBAYXR0cmlidXRlIGRhdGE6IGluaXRpYWwgZGF0YS5cclxuICAgKiBAYXJyZWlidXRlIHRlbXBsYXRlOiBpZiB0aGlzIGNvbXBvbmVudCBuZWVkcyB0byBoYXZlIHN1Yi10ZW1wbGF0ZVxyXG4gICAqIEBhdHRyaWJ1dGUgaGVscGVyOiBpZiBjb21wb25lbnQgbmVlZHMgYSBoZWxwZXIuXHJcbiAgICovXHJcbiAgYWN0aXZhdGUoZGF0YTogYW55LCB0ZW1wbGF0ZT86IGFueSwgaGVscGVyPzogYW55KTogdm9pZDtcclxuXHJcbiAgLypcclxuICAgKiBXaWxsIHRlbGwgY29tcG9uZW50IHRvIHBhdXNlIGFsbCBhY3Rpdml0aWVzIGFuZCBmcmVleiBkYXRhIHRpbGwgYWN0aXZhdGlvbi5cclxuICAgKiByZWNvbW1lbmRhdGlvbiBpcyBmb3IgdGhlIGNvbXBvbmVudCB0byBlaWd0aGVyIHVuZGVmaW5lIGRhdGEgYW5kIGhhbmRsZSBpdCBvciB1c2VcclxuICAgKiBKU09OLnBhcnNlKEpTT04uc3RyaW5neWZ5KGRhdGEpKSB0byBmcmVleiBpdCBhbmQgYnJlYWsgYXdheSBmcm9tIHBvaW50ZXIgaXQgaGFzIHJlY2VpdmVkIGluIGFjdGl2YXRpb25cclxuICAgKi9cclxuICBkZWFjdGl2YXRlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtdGFiJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUudGFiLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS50YWIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuXHRob3ZlcmVkID0gZmFsc2U7XHJcblx0aW5kZXg6IG51bWJlcjtcclxuXHRmbGV4aWJsZUlkOiBzdHJpbmc7XHJcblx0ZHluYW1pY0NvbXBvbmVudDogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNlbGVjdGVkXCIpXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJ0aXRsZVwiKVxyXG5cdHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG5cdFxyXG5cdEBJbnB1dChcImNvbXBvbmVudFwiKVxyXG5cdHB1YmxpYyBjb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJ0YWJhbHRpY29uXCIpXHJcbiAgICBwdWJsaWMgdGFiYWx0aWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRhYmljb25cIilcclxuICAgIHB1YmxpYyB0YWJpY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuXHRwdWJsaWMgc291cmNlRGF0YTogYW55O1xyXG5cdFxyXG5cdEBJbnB1dChcImhhbmRsZXJcIilcclxuXHRwdWJsaWMgaGFuZGxlcjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuXHRcdHByaXZhdGUgaG9zdDogRWxlbWVudFJlZixcclxuXHRcdHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcclxuXHRcdHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxyXG5cdFx0cHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG5cdFx0cHJpdmF0ZSBkZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuXHQpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdpZCcsIHRoaXMuZmxleGlibGVJZCArICctcGFuZWwtJyArIHRoaXMuaW5kZXgpO1xyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdhcmlhLWxhYmVsbGVkYnknLCB0aGlzLmZsZXhpYmxlSWQgKyAnLXRhYi0nICsgdGhpcy5pbmRleCk7XHJcblx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ3JvbGUnLCBcInRhYnBhbmVsXCIpO1xyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdhcmlhLWxhYmVsZWRieScsIHRoaXMuZmxleGlibGVJZCArICctdGFiLScgKyAgdGhpcy5pbmRleCk7XHJcblx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ2FyaWEtaGlkZGVuJywgdGhpcy5zZWxlY3RlZCA/ICdmYWxzZSc6J3RydWUnKTtcclxuXHRcdHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXk9XCJzZWxlY3RlZCA/ICdibG9jayc6J25vbmUnXCIgXHJcblx0fVxyXG5cclxuXHR0ZW1wbGF0ZUNvbnRleHQoKSB7XHJcblx0XHRyZXR1cm4ge2RhdGE6IHRoaXMuc291cmNlRGF0YSB9O1xyXG5cdH1cclxuXHRkZWFjdGl2YXRlKGRlc2VsZWN0OiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRpZiAoZGVzZWxlY3QpIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICd0YWJJbmRleCcsICctMScpO1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdub25lJyk7XHJcblx0XHRcdGlmKHRoaXMuc2VsZWN0ZWQpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdFx0aWYgKHRoaXMuZHluYW1pY0NvbXBvbmVudCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgaW5zdGFuY2UgPSAoPER5bmFtaWNUYWJDb250ZW50Q29tcG9uZW50PnRoaXMuZHluYW1pY0NvbXBvbmVudC5pbnN0YW5jZSk7XHJcblx0XHRcdFx0XHRpbnN0YW5jZS5kZWFjdGl2YXRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmhvdmVyZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdH1cclxuXHRhY3RpdmF0ZSgpOiB2b2lkIHtcclxuXHRcdGlmICghdGhpcy5zZWxlY3RlZCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAndGFiSW5kZXgnLCAnMCcpO1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcclxuXHRcdFx0XHR0aGlzLmluaXRpYWxpemVEeW5hbWljQ29tcG9uZW50KCk7XHJcblx0XHRcdFx0Y29uc3QgaW5zdGFuY2UgPSAoPER5bmFtaWNUYWJDb250ZW50Q29tcG9uZW50PnRoaXMuZHluYW1pY0NvbXBvbmVudC5pbnN0YW5jZSk7XHJcblx0XHRcdFx0aW5zdGFuY2UuYWN0aXZhdGUodGhpcy5zb3VyY2VEYXRhLCB0aGlzLnRlbXBsYXRlLCB0aGlzLmhhbmRsZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyKGZsYWc6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMuaG92ZXJlZCA9IGZsYWc7XHJcblx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHR9XHJcblx0cHJpdmF0ZSBpbml0aWFsaXplRHluYW1pY0NvbXBvbmVudCgpIHtcclxuXHRcdGlmICghdGhpcy5keW5hbWljQ29tcG9uZW50KSB7XHJcblx0XHRcdHRoaXMuZHluYW1pY0NvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcblx0XHRcdFx0LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY29tcG9uZW50KVxyXG5cdFx0XHRcdC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XHJcblxyXG5cdFx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMuZHluYW1pY0NvbXBvbmVudC5ob3N0Vmlldyk7XHJcblx0XHRcdHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKCh0aGlzLmR5bmFtaWNDb21wb25lbnQuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS10YWJzJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUudGFicy5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUudGFicy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0ICB7XHJcblx0dGFicyA9IFtdO1xyXG5cdHNlbGVjdGVkSW5kZXggPSAtMTtcclxuXHRpc0ljb25pZmllZCA9IGZhbHNlO1xyXG5cdHBvcHBlZCA9IGZhbHNlO1xyXG5cclxuXHRAQ29udGVudENoaWxkcmVuKEZsZXhpYmxlVGFiQ29tcG9uZW50KVxyXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8RmxleGlibGVUYWJDb21wb25lbnQ+O1xyXG5cclxuICAgIEBJbnB1dChcInBvc2l0aW9uXCIpXHJcbiAgICBwdWJsaWMgcG9zaXRpb24gPSBUYWJQb3NpdGlvbnMudG9wO1xyXG5cclxuICAgIEBJbnB1dChcInR5cGVcIilcclxuICAgIHB1YmxpYyB0eXBlID0gVGFiVHlwZXMudGFiO1xyXG5cclxuICAgIEBJbnB1dChcInBvcGhvdmVyXCIpXHJcbiAgICBwdWJsaWMgcG9waG92ZXIgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJtZXNzYWdlXCIpXHJcbiAgICBwdWJsaWMgbWVzc2FnZSA9IFwiQ2xpY2sgdG8gc2VsZWN0IHRhYi4gVXNlIGFycm93IGtleXMgdG8gbmF2aWdhdGUgdG8gb3RoZXIgdGFicy5cIjtcclxuXHJcblx0QElucHV0KFwiZmxleGlibGVJZFwiKVxyXG5cdHB1YmxpYyBmbGV4aWJsZUlkID0gJyc7XHJcblxyXG5cdEBJbnB1dChcImNvbGxhcHNlZFwiKVxyXG5cdHB1YmxpYyBjb2xsYXBzZWQgPSBmYWxzZTtcclxuXHRcclxuXHRAT3V0cHV0KCdvbmNoYW5nZScpXHJcblx0cHJpdmF0ZSBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuXHRcdGxldCBkZWZhdWx0SW5kZXggPSAgdGhpcy5wb3Bob3ZlciA/IC0xIDogMDtcclxuXHRcdHRoaXMudGFicyA9IFtdO1xyXG5cdFx0dGhpcy5pc0ljb25pZmllZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgodGFiSW5zdGFuY2UsIGluZGV4KSA9PiB7XHJcblx0XHRcdHRhYkluc3RhbmNlLmluZGV4ID0gaW5kZXg7XHJcblx0XHRcdHRhYkluc3RhbmNlLmZsZXhpYmxlSWQgPSB0aGlzLmZsZXhpYmxlSWQ7XHJcblx0XHRcdGlmKHRhYkluc3RhbmNlLnNlbGVjdGVkKSB7XHJcblx0XHRcdFx0ZGVmYXVsdEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmlzSWNvbmlmaWVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRhYkluc3RhbmNlLnRhYmljb24gfHwgdGFiSW5zdGFuY2UudGFiYWx0aWNvbikge1xyXG5cdFx0XHRcdHRoaXMuaXNJY29uaWZpZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudGFicy5wdXNoKHRhYkluc3RhbmNlKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMudGFicy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RUYWIoIGRlZmF1bHRJbmRleCApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gZGVmYXVsdEluZGV4O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0a2V5dXAoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG5cdFx0Y29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0bGV0IGlkID0gdW5kZWZpbmVkO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDM3ICYmICh0aGlzLnBvc2l0aW9uID09PSAndG9wJyB8fCB0aGlzLnBvc2l0aW9uID09PSAnYm90dG9tJykpIHsgLy8gbGVmdCBhcnJvd1xyXG5cdFx0XHRpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArICctdGFiLScgKyAoaW5kZXggLSAxKSk7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDM5ICYmICh0aGlzLnBvc2l0aW9uID09PSAndG9wJyB8fCB0aGlzLnBvc2l0aW9uID09PSAnYm90dG9tJykpIHsvLyByZ2h0IGFycm93XHJcblx0XHRcdGlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgJy10YWItJyArIChpbmRleCArIDEpKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMzggJiYgKHRoaXMucG9zaXRpb24gPT09ICdsZWZ0JyB8fCB0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnKSkgeyAvLyB1cCBhcnJvd1xyXG5cdFx0XHRpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArICctdGFiLScgKyAoaW5kZXggKyAxKSk7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDQwICYmICh0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgfHwgdGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0JykpIHsvLyBkb3duIGFycm93XHJcblx0XHRcdGlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgJy10YWItJyArIChpbmRleCAtIDEpKTtcclxuXHRcdH1cclxuXHRcdGlmIChpZCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0aWQuZm9jdXMoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaW5kZXg6IG51bWJlcikge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRJbmRleCAhPSBpbmRleCkge1xyXG5cdFx0XHR0aGlzLnRhYnMubWFwKCh0YWIpPT57XHJcblx0XHRcdFx0dGFiLmRlYWN0aXZhdGUodHJ1ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoaW5kZXggPiAtMSkge1xyXG5cdFx0XHRcdHRoaXMudGFic1tpbmRleF0uYWN0aXZhdGUoKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuXHRcdFx0XHR0aGlzLnBvcHBlZCA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuXHRcdFx0XHRcdHNlbGVjdGVkSW5kZXg6IGluZGV4LFxyXG5cdFx0XHRcdFx0c2VsZWN0ZWRUaXRsZTogdGhpcy50YWJzW2luZGV4XS50aXRsZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyVGFiKGluZGV4OiBudW1iZXIsIGZsYWc6IGJvb2xlYW4pIHtcclxuXHRcdGlmICh0aGlzLnBvcGhvdmVyKSB7XHJcblx0XHRcdHRoaXMudGFicy5tYXAoKHRhYik9PntcclxuXHRcdFx0XHR0YWIuZGVhY3RpdmF0ZShmYWxzZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoaW5kZXggPiAtMSl7XHJcblx0XHRcdFx0dGhpcy50YWJzW2luZGV4XS5ob3ZlcihmbGFnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnBvcHBlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA+IC0xIHx8IGZsYWc7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==