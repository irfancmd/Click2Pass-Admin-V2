import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
import { AuthService } from './auth.service';
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	// MENUITEMS: Menu[] = [
	// 	{
	// 		path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
	// 	},
	// 	{
	// 		title: 'Products', icon: 'box', type: 'sub', active: false, children: [
	// 			{
	// 				title: 'Physical', type: 'sub', children: [
	// 					{ path: '/products/physical/category', title: 'Category', type: 'link' },
	// 					{ path: '/products/physical/sub-category', title: 'Sub Category', type: 'link' },
	// 					{ path: '/products/physical/product-list', title: 'Product List', type: 'link' },
	// 					{ path: '/products/physical/product-detail', title: 'Product Detail', type: 'link' },
	// 					{ path: '/products/physical/add-product', title: 'Add Product', type: 'link' },
	// 				]
	// 			},
	// 			{
	// 				title: 'digital', type: 'sub', children: [
	// 					{ path: '/products/digital/digital-category', title: 'Category', type: 'link' },
	// 					{ path: '/products/digital/digital-sub-category', title: 'Sub Category', type: 'link' },
	// 					{ path: '/products/digital/digital-product-list', title: 'Product List', type: 'link' },
	// 					{ path: '/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
	// 				]
	// 			},
	// 		]
	// 	},
	// 	{
	// 		title: 'Sales', icon: 'dollar-sign', type: 'sub', active: false, children: [
	// 			{ path: '/sales/orders', title: 'Orders', type: 'link' },
	// 			{ path: '/sales/transactions', title: 'Transactions', type: 'link' },
	// 		]
	// 	},
	// 	{
	// 		title: 'Coupons', icon: 'tag', type: 'sub', active: false, children: [
	// 			{ path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
	// 			{ path: '/coupons/create-coupons', title: 'Create Coupons', type: 'link' },
	// 		]
	// 	},
	// 	{
	// 		title: 'Pages', icon: 'clipboard', type: 'sub', active: false, children: [
	// 			{ path: '/pages/list-page', title: 'List Page', type: 'link' },
	// 			{ path: '/pages/create-page', title: 'Create Page', type: 'link' },
	// 		]
	// 	},
	// 	{
	// 		title: 'Media', path: '/media', icon: 'camera', type: 'link', active: false
	// 	},
	// 	{
	// 		title: 'Menus', icon: 'align-left', type: 'sub', active: false, children: [
	// 			{ path: '/menus/list-menu', title: 'Menu Lists', type: 'link' },
	// 			{ path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
	// 		]
	// 	},
	// 	{
	// 		title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
	// 			{ path: '/users/list-user', title: 'User List', type: 'link' },
	// 			{ path: '/users/create-user', title: 'Create User', type: 'link' },
	// 		]
	// 	},
	// 	{
	// 		title: 'Vendors', icon: 'users', type: 'sub', active: false, children: [
	// 			{ path: '/vendors/list-vendors', title: 'Vendor List', type: 'link' },
	// 			{ path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
	// 		]
	// 	},
	// 	{
	// 		title: 'Localization', icon: 'chrome', type: 'sub', children: [
	// 			{ path: '/localization/translations', title: 'Translations', type: 'link' },
	// 			{ path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
	// 			{ path: '/localization/taxes', title: 'Taxes', type: 'link' },
	// 		]
	// 	},
	// 	{
	// 		title: 'Reports', path: '/reports', icon: 'bar-chart', type: 'link', active: false
	// 	},
	// 	{
	// 		title: 'Settings', icon: 'settings', type: 'sub', children: [
	// 			{ path: '/settings/profile', title: 'Profile', type: 'link' },
	// 		]
	// 	},
	// 	{
	// 		title: 'Invoice', path: '/invoice', icon: 'archive', type: 'link', active: false
	// 	},
	// 	{
	// 		title: 'Login',path: '/auth/login', icon: 'log-in', type: 'link', active: false
	// 	}
	// ]

	public screenWidth: any
	public collapseSidebar: boolean = false

	MENUITEMS: Menu[] = [];

	public items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

	constructor(@Inject(WINDOW) private window, private authService: AuthService) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}

		this.MENUITEMS = [
			{
				title: 'Question', icon: 'archive', type: 'sub', active: false, children: [
					{ path: '/question', title: 'Question List', type: 'link' },
					{ path: '/question/form', title: 'Question Form', type: 'link' },
				]
			},
			{
				title: 'Curriculum', icon: 'archive', type: 'sub', active: false, children: [
					{ path: '/curriculum', title: 'Curriculum List', type: 'link' },
					{ path: '/curriculum/form', title: 'Curriculum Form', type: 'link' },
				]
			},
			{
				title: 'Chapter', icon: 'archive', type: 'sub', active: false, children: [
					{ path: '/chapter', title: 'Chapter List', type: 'link' },
					{ path: '/chapter/form', title: 'Chapter Form', type: 'link' },
				]
			},
			{
				title: 'Question Set', icon: 'archive', type: 'sub', active: false, children: [
					{ path: '/question-set', title: 'Question Set List', type: 'link' },
					{ path: '/question-set/form', title: 'Question Set Form', type: 'link' },
				]
			},
			{
				title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
					{ path: '/users/list-user', title: 'User List', type: 'link' },
					{ path: '/users/create-user', title: 'Create User', type: 'link' },
				]
			},
			{
				title: 'Settings', icon: 'settings', type: 'sub', active: false, children: [
					{ path: '/settings', title: 'General', type: 'link' },
				]
			},

		]

	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	populateRoleWiseMenus() {
		this.MENUITEMS = [];

		let mainMenuIndex: number = 0;

		if (this.authService.currentUser.readCurriculum) {
			this.MENUITEMS.push(
				{
					title: 'Curriculum', icon: 'archive', type: 'sub', active: false, children: [
						{ path: '/curriculum', title: 'Curriculum List', type: 'link' },
					]
				},
			);

			if (this.authService.currentUser.createCurriculum) {
				this.MENUITEMS[mainMenuIndex].children.push(
					{ path: '/curriculum/form', title: 'Curriculum Form', type: 'link' },
				);
			}

			++mainMenuIndex;
		}

		if (this.authService.currentUser.readChapter) {
			this.MENUITEMS.push(
				{
					title: 'Chapter', icon: 'archive', type: 'sub', active: false, children: [
						{ path: '/chapter', title: 'Chapter List', type: 'link' },
					]
				},
			);

			if (this.authService.currentUser.createChapter) {
				this.MENUITEMS[mainMenuIndex].children.push(
					{ path: '/chapter/form', title: 'Chapter Form', type: 'link' },
				);
			}

			++mainMenuIndex;
		}

		if (this.authService.currentUser.readQuestion) {
			this.MENUITEMS.push(
				{
					title: 'Question', icon: 'archive', type: 'sub', active: false, children: [
						{ path: '/question', title: 'Question List', type: 'link' },
					]
				},
			);

			if (this.authService.currentUser.createQuestion) {
				this.MENUITEMS[mainMenuIndex].children.push(
					{ path: '/question/form', title: 'Question Form', type: 'link' },
				);
			}

			++mainMenuIndex;
		}

		if (this.authService.currentUser.readQuestionSet) {
			this.MENUITEMS.push(
				{
					title: 'Question Set', icon: 'archive', type: 'sub', active: false, children: [
						{ path: '/question-set', title: 'Question Set List', type: 'link' },
					]
				},
			);

			if (this.authService.currentUser.createQuestionSet) {
				this.MENUITEMS[mainMenuIndex].children.push(
					{ path: '/question-set/form', title: 'Question Set Form', type: 'link' },
				);
			}

			++mainMenuIndex;
		}

		if (this.authService.currentUser.readUser) {
			this.MENUITEMS.push(

				{
					title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
						{ path: '/users/list-user', title: 'User List', type: 'link' },
					]
				},
			);

			// if (this.authService.currentUser.createUser) {
			// 	this.MENUITEMS[mainMenuIndex].children.push(
			// 		{ path: '/users/create-user', title: 'Create User', type: 'link' },
			// 	);
			// }

			++mainMenuIndex;
		}

		const allowedSettingsEmails = ['mh.shiblee@gmail.com', 'click2pass@outlook.com', 'irfan.muhit85@gmail.com', 'su@email.com'];

		if (allowedSettingsEmails.includes(this.authService.currentUser.email)) {
			this.MENUITEMS.push(
				{
					title: 'Settings', icon: 'settings', type: 'sub', active: false, children: [
						{ path: '/settings', title: 'General', type: 'link' },
					]
				},
			);
		}

		// Array
		this.items.next(this.MENUITEMS);
	}

}
