/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ContentChildren, QueryList, EventEmitter } from '@angular/core';
/** @enum {string} */
const TabTypes = {
    button: "button",
    tab: "tab",
    plain: "plain",
    icon: "icon",
    radio: "radio",
};
export { TabTypes };
/** @enum {string} */
const TabPositions = {
    top: "top",
    left: "left",
    right: "right",
    bottom: "bottom",
};
export { TabPositions };
export class FlexibleTabComponent {
    constructor() {
        this.hovered = false;
        this.selected = false;
    }
    /**
     * @return {?}
     */
    templateContext() {
        return { data: this.sourceData };
    }
}
FlexibleTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-tab',
                template: "    \r\n<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template\"></ng-content>\r\n",
                styles: [":host{padding:0;margin:0;width:100%}"]
            }] }
];
/** @nocollapse */
FlexibleTabComponent.ctorParameters = () => [];
FlexibleTabComponent.propDecorators = {
    selected: [{ type: Input, args: ["selected",] }],
    title: [{ type: Input, args: ["title",] }],
    tabalticon: [{ type: Input, args: ["tabalticon",] }],
    tabicon: [{ type: Input, args: ["tabicon",] }],
    template: [{ type: Input, args: ["template",] }],
    sourceData: [{ type: Input, args: ["data",] }]
};
if (false) {
    /** @type {?} */
    FlexibleTabComponent.prototype.hovered;
    /** @type {?} */
    FlexibleTabComponent.prototype.selected;
    /** @type {?} */
    FlexibleTabComponent.prototype.title;
    /** @type {?} */
    FlexibleTabComponent.prototype.tabalticon;
    /** @type {?} */
    FlexibleTabComponent.prototype.tabicon;
    /** @type {?} */
    FlexibleTabComponent.prototype.template;
    /** @type {?} */
    FlexibleTabComponent.prototype.sourceData;
}
export class FlexibleTabsComponent {
    constructor() {
        this.tabs = [];
        this.selectedIndex = -1;
        this.isIconified = false;
        this.popped = false;
        this.position = TabPositions.top;
        this.type = TabTypes.tab;
        this.pophover = false;
        this.message = "click to select tab ";
        this.onchange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.tabs = [];
        this.selectedIndex = this.pophover ? -1 : 0;
        this.isIconified = false;
        this.children.forEach((tabInstance, index) => {
            if (tabInstance.selected) {
                this.selectedIndex = index;
            }
            this.isIconified = true;
            if (tabInstance.tabicon || tabInstance.tabalticon) {
                this.isIconified = true;
            }
            this.tabs.push(tabInstance);
        });
        if (this.tabs.length) {
            this.selectTab(this.selectedIndex);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyup(event) {
        /** @type {?} */
        const code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectTab(index) {
        this.tabs.map((tab) => {
            tab.selected = false;
            tab.hovered = false;
        });
        if (index > -1) {
            this.tabs[index].selected = true;
            this.selectedIndex = index;
            this.popped = true;
            this.onchange.emit({
                selectedIndex: index,
                selectedTitle: this.tabs[index].title
            });
        }
    }
    /**
     * @param {?} index
     * @param {?} flag
     * @return {?}
     */
    hoverTab(index, flag) {
        if (this.pophover) {
            this.tabs.map((tab) => {
                tab.hovered = false;
            });
            if (index > -1) {
                this.tabs[index].hovered = flag;
            }
            this.popped = this.selectedIndex > -1 || flag;
        }
    }
}
FlexibleTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-tabs',
                template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'top' || position === 'left'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div class=\"tabs-viewport\" [class.popper]=\"pophover\" [class.pop]=\"popped\" (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
                styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;padding:10px;min-height:150px}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:0 0 10%;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
            }] }
];
/** @nocollapse */
FlexibleTabsComponent.ctorParameters = () => [];
FlexibleTabsComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [FlexibleTabComponent,] }],
    position: [{ type: Input, args: ["position",] }],
    type: [{ type: Input, args: ["type",] }],
    pophover: [{ type: Input, args: ["pophover",] }],
    message: [{ type: Input, args: ["message",] }],
    onchange: [{ type: Output, args: ['onchange',] }]
};
if (false) {
    /** @type {?} */
    FlexibleTabsComponent.prototype.tabs;
    /** @type {?} */
    FlexibleTabsComponent.prototype.selectedIndex;
    /** @type {?} */
    FlexibleTabsComponent.prototype.isIconified;
    /** @type {?} */
    FlexibleTabsComponent.prototype.popped;
    /** @type {?} */
    FlexibleTabsComponent.prototype.children;
    /** @type {?} */
    FlexibleTabsComponent.prototype.position;
    /** @type {?} */
    FlexibleTabsComponent.prototype.type;
    /** @type {?} */
    FlexibleTabsComponent.prototype.pophover;
    /** @type {?} */
    FlexibleTabsComponent.prototype.message;
    /** @type {?} */
    FlexibleTabsComponent.prototype.onchange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUudGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbGV4aWJsZS10YWJzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS10YWJzL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQ0gsU0FBUyxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sZUFBZSxFQUNmLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxlQUFlLENBQUM7OztJQUd0QixRQUFTLFFBQVE7SUFDakIsS0FBTSxLQUFLO0lBQ1gsT0FBUSxPQUFPO0lBQ2YsTUFBTyxNQUFNO0lBQ2IsT0FBUSxPQUFPOzs7OztJQUlmLEtBQU0sS0FBSztJQUNYLE1BQU8sTUFBTTtJQUNiLE9BQVEsT0FBTztJQUNmLFFBQVMsUUFBUTs7O0FBUWxCLE1BQU07SUFzQkY7dUJBcEJPLEtBQUs7d0JBR00sS0FBSztLQWlCUDs7OztJQUVuQixlQUFlO1FBQ2QsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNoQzs7O1lBL0JELFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsY0FBYztnQkFDeEIsbVRBQTRDOzthQUU1Qzs7Ozs7dUJBS0ksS0FBSyxTQUFDLFVBQVU7b0JBR2hCLEtBQUssU0FBQyxPQUFPO3lCQUdiLEtBQUssU0FBQyxZQUFZO3NCQUdsQixLQUFLLFNBQUMsU0FBUzt1QkFHZixLQUFLLFNBQUMsVUFBVTt5QkFHaEIsS0FBSyxTQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCakIsTUFBTTtJQXdCRjtvQkF2QkksRUFBRTs2QkFDTyxDQUFDLENBQUM7MkJBQ0osS0FBSztzQkFDVixLQUFLO3dCQU1PLFlBQVksQ0FBQyxHQUFHO29CQUdwQixRQUFRLENBQUMsR0FBRzt3QkFHUixLQUFLO3VCQUdOLHNCQUFzQjt3QkFHdkIsSUFBSSxZQUFZLEVBQUU7S0FF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Ozs7Ozt1QkFPQyxlQUFlLFNBQUMsb0JBQW9CO3VCQUdqQyxLQUFLLFNBQUMsVUFBVTttQkFHaEIsS0FBSyxTQUFDLE1BQU07dUJBR1osS0FBSyxTQUFDLFVBQVU7c0JBR2hCLEtBQUssU0FBQyxTQUFTO3VCQUdsQixNQUFNLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0Q29udGVudENoaWxkcmVuLFxyXG5cdFF1ZXJ5TGlzdCxcclxuXHRBZnRlckNvbnRlbnRJbml0LFxyXG5cdEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGVudW0gVGFiVHlwZXMge1xyXG5cdGJ1dHRvbiA9IFwiYnV0dG9uXCIsIFxyXG5cdHRhYiA9IFwidGFiXCIsIFxyXG5cdHBsYWluID0gXCJwbGFpblwiLCBcclxuXHRpY29uID0gXCJpY29uXCIsIFxyXG5cdHJhZGlvID0gXCJyYWRpb1wiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRhYlBvc2l0aW9ucyB7XHJcblx0dG9wID0gXCJ0b3BcIiwgXHJcblx0bGVmdCA9IFwibGVmdFwiLCBcclxuXHRyaWdodCA9IFwicmlnaHRcIiwgXHJcblx0Ym90dG9tID0gXCJib3R0b21cIlxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLXRhYicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLnRhYi5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUudGFiLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFiQ29tcG9uZW50IHtcclxuXHJcblx0aG92ZXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcInNlbGVjdGVkXCIpXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJ0aXRsZVwiKVxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGFiYWx0aWNvblwiKVxyXG4gICAgcHVibGljIHRhYmFsdGljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJ0YWJpY29uXCIpXHJcbiAgICBwdWJsaWMgdGFiaWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRlbXBsYXRlXCIpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgICBwdWJsaWMgc291cmNlRGF0YTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0dGVtcGxhdGVDb250ZXh0KCkge1xyXG5cdFx0cmV0dXJuIHtkYXRhOiB0aGlzLnNvdXJjZURhdGEgfTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLXRhYnMnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQgIHtcclxuXHR0YWJzID0gW107XHJcblx0c2VsZWN0ZWRJbmRleCA9IC0xO1xyXG5cdGlzSWNvbmlmaWVkID0gZmFsc2U7XHJcblx0cG9wcGVkID0gZmFsc2U7XHJcblxyXG5cdEBDb250ZW50Q2hpbGRyZW4oRmxleGlibGVUYWJDb21wb25lbnQpXHJcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxGbGV4aWJsZVRhYkNvbXBvbmVudD47XHJcblxyXG4gICAgQElucHV0KFwicG9zaXRpb25cIilcclxuICAgIHB1YmxpYyBwb3NpdGlvbiA9IFRhYlBvc2l0aW9ucy50b3A7XHJcblxyXG4gICAgQElucHV0KFwidHlwZVwiKVxyXG4gICAgcHVibGljIHR5cGUgPSBUYWJUeXBlcy50YWI7XHJcblxyXG4gICAgQElucHV0KFwicG9waG92ZXJcIilcclxuICAgIHB1YmxpYyBwb3Bob3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJjbGljayB0byBzZWxlY3QgdGFiIFwiO1xyXG5cclxuXHRAT3V0cHV0KCdvbmNoYW5nZScpXHJcblx0cHJpdmF0ZSBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuXHRcdHRoaXMudGFicyA9IFtdO1xyXG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5wb3Bob3ZlciA/IC0xIDogMDtcclxuXHRcdHRoaXMuaXNJY29uaWZpZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKHRhYkluc3RhbmNlLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRpZih0YWJJbnN0YW5jZS5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5pc0ljb25pZmllZCA9IHRydWU7XHJcblx0XHRcdGlmICh0YWJJbnN0YW5jZS50YWJpY29uIHx8IHRhYkluc3RhbmNlLnRhYmFsdGljb24pIHtcclxuXHRcdFx0XHR0aGlzLmlzSWNvbmlmaWVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnRhYnMucHVzaCh0YWJJbnN0YW5jZSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLnRhYnMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0VGFiKCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGtleXVwKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpbmRleCkge1xyXG5cdFx0dGhpcy50YWJzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHR0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0dGFiLmhvdmVyZWQgPSBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKGluZGV4ID4gLTEpIHtcclxuXHRcdFx0dGhpcy50YWJzW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHR0aGlzLnBvcHBlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcblx0XHRcdFx0c2VsZWN0ZWRJbmRleDogaW5kZXgsXHJcblx0XHRcdFx0c2VsZWN0ZWRUaXRsZTogdGhpcy50YWJzW2luZGV4XS50aXRsZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJUYWIoaW5kZXgsIGZsYWcpIHtcclxuXHRcdGlmICh0aGlzLnBvcGhvdmVyKSB7XHJcblx0XHRcdHRoaXMudGFicy5tYXAoKHRhYik9PntcclxuXHRcdFx0XHR0YWIuaG92ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGluZGV4ID4gLTEpe1xyXG5cdFx0XHRcdHRoaXMudGFic1tpbmRleF0uaG92ZXJlZCA9IGZsYWc7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5wb3BwZWQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPiAtMSB8fCBmbGFnO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=