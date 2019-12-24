import { __decorate } from 'tslib';
import { ComponentFactoryResolver, ElementRef, ApplicationRef, Injector, Renderer2, ChangeDetectorRef, Input, Component, EventEmitter, ContentChildren, Output, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

var TabTypes;
(function (TabTypes) {
    TabTypes["button"] = "button";
    TabTypes["tab"] = "tab";
    TabTypes["plain"] = "plain";
    TabTypes["icon"] = "icon";
    TabTypes["radio"] = "radio";
})(TabTypes || (TabTypes = {}));
var TabPositions;
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
    __decorate([
        Input("selected")
    ], FlexibleTabComponent.prototype, "selected", void 0);
    __decorate([
        Input("title")
    ], FlexibleTabComponent.prototype, "title", void 0);
    __decorate([
        Input("component")
    ], FlexibleTabComponent.prototype, "component", void 0);
    __decorate([
        Input("tabalticon")
    ], FlexibleTabComponent.prototype, "tabalticon", void 0);
    __decorate([
        Input("tabicon")
    ], FlexibleTabComponent.prototype, "tabicon", void 0);
    __decorate([
        Input("template")
    ], FlexibleTabComponent.prototype, "template", void 0);
    __decorate([
        Input("data")
    ], FlexibleTabComponent.prototype, "sourceData", void 0);
    __decorate([
        Input("handler")
    ], FlexibleTabComponent.prototype, "handler", void 0);
    FlexibleTabComponent = __decorate([
        Component({
            selector: 'flexible-tab',
            template: "<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template && !component\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template && !component\"></ng-content>\r\n",
            styles: [":host{padding:10px;margin:0;width:100%;display:block;box-sizing:border-box}:host:focus{outline:0}"]
        })
    ], FlexibleTabComponent);
    return FlexibleTabComponent;
}());
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
    __decorate([
        ContentChildren(FlexibleTabComponent)
    ], FlexibleTabsComponent.prototype, "children", void 0);
    __decorate([
        Input("position")
    ], FlexibleTabsComponent.prototype, "position", void 0);
    __decorate([
        Input("type")
    ], FlexibleTabsComponent.prototype, "type", void 0);
    __decorate([
        Input("pophover")
    ], FlexibleTabsComponent.prototype, "pophover", void 0);
    __decorate([
        Input("message")
    ], FlexibleTabsComponent.prototype, "message", void 0);
    __decorate([
        Input("flexibleId")
    ], FlexibleTabsComponent.prototype, "flexibleId", void 0);
    __decorate([
        Input("collapsed")
    ], FlexibleTabsComponent.prototype, "collapsed", void 0);
    __decorate([
        Output('onchange')
    ], FlexibleTabsComponent.prototype, "onchange", void 0);
    FlexibleTabsComponent = __decorate([
        Component({
            selector: 'flexible-tabs',
            template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div *ngIf=\"position === 'top' || position === 'left'\"\r\n        [attr.aria-orientation]=\"position === 'left' ?  'vertical' : 'horizontal'\"\r\n        [class.collapsed]=\"collapsed\" \r\n        class=\"tabs-control\" \r\n        role=\"tablist\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"tab\" \r\n            (keyup)=\"keyup($event, i)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n\t\t\t[id]=\"flexibleId + '-tab-' + i\" \r\n            [attr.tabindex]=\"tab.selected ? 0 : -1\"\r\n            [attr.aria-controls]=\"flexibleId + '-panel-' + i\" \r\n            [attr.aria-selected]=\"tab.selected ? true:false\" \r\n            [attr.aria-posinset]=\"i+1\" \r\n            [attr.aria-setsize]=\"tabs.length\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\"  [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div \r\n        class=\"tabs-viewport\" \r\n        role=\"tabpanel\"\r\n        [class.popper]=\"pophover\" \r\n        [class.pop]=\"popped\" \r\n        (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div *ngIf=\"position === 'bottom' || position === 'right'\"\r\n        [class.collapsed]=\"collapsed\" \r\n        [attr.aria-orientation]=\"position === 'right' ? 'vertical' : 'horizontal'\"\r\n        class=\"tabs-control\" \r\n        role=\"tablist\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"tab\" \r\n            (keyup)=\"keyup($event, i)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [id]=\"flexibleId + '-tab-' + i\" \r\n            [attr.tabindex]=\"tab.selected ? 0 : -1\"\r\n            [attr.aria-controls]=\"flexibleId + '-panel-' + i\" \r\n            [attr.aria-selected]=\"tab.selected ? true:false\" \r\n            [attr.aria-posinset]=\"i+1\" \r\n            [attr.aria-setsize]=\"tabs.length\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\"  [class]=\"tab.tabalticon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
            styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;min-height:150px;display:flex;align-items:stretch}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;min-width:27px;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs .tabs-control a.icon :before{display:block}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
        })
    ], FlexibleTabsComponent);
    return FlexibleTabsComponent;
}());

var FlexibleTabsModule = /** @class */ (function () {
    function FlexibleTabsModule() {
    }
    FlexibleTabsModule = __decorate([
        NgModule({
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
        })
    ], FlexibleTabsModule);
    return FlexibleTabsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { FlexibleTabComponent, FlexibleTabsComponent, FlexibleTabsModule, TabPositions, TabTypes };
//# sourceMappingURL=sedeh-flexible-tabs.js.map
