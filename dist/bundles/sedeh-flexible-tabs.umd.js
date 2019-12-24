(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/flexible-tabs', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['flexible-tabs'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    (function (TabTypes) {
        TabTypes["button"] = "button";
        TabTypes["tab"] = "tab";
        TabTypes["plain"] = "plain";
        TabTypes["icon"] = "icon";
        TabTypes["radio"] = "radio";
    })(exports.TabTypes || (exports.TabTypes = {}));

    (function (TabPositions) {
        TabPositions["top"] = "top";
        TabPositions["left"] = "left";
        TabPositions["right"] = "right";
        TabPositions["bottom"] = "bottom";
    })(exports.TabPositions || (exports.TabPositions = {}));
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
            { type: core.ComponentFactoryResolver },
            { type: core.ElementRef },
            { type: core.ApplicationRef },
            { type: core.Injector },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input("selected")
        ], FlexibleTabComponent.prototype, "selected", void 0);
        __decorate([
            core.Input("title")
        ], FlexibleTabComponent.prototype, "title", void 0);
        __decorate([
            core.Input("component")
        ], FlexibleTabComponent.prototype, "component", void 0);
        __decorate([
            core.Input("tabalticon")
        ], FlexibleTabComponent.prototype, "tabalticon", void 0);
        __decorate([
            core.Input("tabicon")
        ], FlexibleTabComponent.prototype, "tabicon", void 0);
        __decorate([
            core.Input("template")
        ], FlexibleTabComponent.prototype, "template", void 0);
        __decorate([
            core.Input("data")
        ], FlexibleTabComponent.prototype, "sourceData", void 0);
        __decorate([
            core.Input("handler")
        ], FlexibleTabComponent.prototype, "handler", void 0);
        FlexibleTabComponent = __decorate([
            core.Component({
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
            this.position = exports.TabPositions.top;
            this.type = exports.TabTypes.tab;
            this.pophover = false;
            this.message = "Click to select tab. Use arrow keys to navigate to other tabs.";
            this.flexibleId = '';
            this.collapsed = false;
            this.onchange = new core.EventEmitter();
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
            core.ContentChildren(FlexibleTabComponent)
        ], FlexibleTabsComponent.prototype, "children", void 0);
        __decorate([
            core.Input("position")
        ], FlexibleTabsComponent.prototype, "position", void 0);
        __decorate([
            core.Input("type")
        ], FlexibleTabsComponent.prototype, "type", void 0);
        __decorate([
            core.Input("pophover")
        ], FlexibleTabsComponent.prototype, "pophover", void 0);
        __decorate([
            core.Input("message")
        ], FlexibleTabsComponent.prototype, "message", void 0);
        __decorate([
            core.Input("flexibleId")
        ], FlexibleTabsComponent.prototype, "flexibleId", void 0);
        __decorate([
            core.Input("collapsed")
        ], FlexibleTabsComponent.prototype, "collapsed", void 0);
        __decorate([
            core.Output('onchange')
        ], FlexibleTabsComponent.prototype, "onchange", void 0);
        FlexibleTabsComponent = __decorate([
            core.Component({
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
            core.NgModule({
                imports: [
                    common.CommonModule
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
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            })
        ], FlexibleTabsModule);
        return FlexibleTabsModule;
    }());

    exports.FlexibleTabComponent = FlexibleTabComponent;
    exports.FlexibleTabsComponent = FlexibleTabsComponent;
    exports.FlexibleTabsModule = FlexibleTabsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-flexible-tabs.umd.js.map
