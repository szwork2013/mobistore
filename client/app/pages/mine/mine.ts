import {Page, NavController, NavParams, Modal} from 'ionic-angular';
import {ImgPathPipe} from '../../pipes/img-path';

import {MineService}    from '../../services/mine';
import {OrderService}    from '../../services/order';

import {MyFrame} from '../my-frame/my-frame';
import {MsgList} from '../msg/msg-list';
import {Profile} from '../client/profile';
import {Collections} from '../client/collections';

import {OrderList} from '../order/order-list';
import {AddressList} from '../address/address-list';
import {Suggestion} from '../client/suggestion';

@Page({
  templateUrl: 'build/pages/mine/mine.html',
  providers: [MineService, OrderService],
  directives: [],
  pipes: [ImgPathPipe]
})
export class Mine {
    data: any;
    errorMessage: any;

    constructor(private nav: NavController, private mineService: MineService, private orderService: OrderService) {

    }
    onPageWillEnter(): void {
        let me = this;
        me.mineService.getData().subscribe(
            json => me.data = json.data,
            error => me.errorMessage = <any>error
        );
    }

    showAllOrders() {
        let me = this;
        me.nav.push(OrderList, status);
    }

    showOrders(status) {
        let me = this;
        if ( eval('me.data.' + status) > 0 ) {
            this.nav.push(OrderList, status);
        }
    }

    showAddress() {
        let me = this;
        this.nav.push(AddressList, {});
    }

    suggest() {
        let me = this;
        this.nav.push(Suggestion, {});
    }
    gotoMkt() {
        let me = this;

        let modal = Modal.create(MyFrame, {title: '请投票!', url: 'http://m.app.mi.com/#page=detail&id=1104'});
        modal.onDismiss(success => {

        });
        this.nav.present(modal);
    }

    editProfile() {
        let me = this;
        this.nav.push(Profile, {});
    }

    showMsgs() {
        let me = this;
        this.nav.push(MsgList, {});
    }

    showCollections() {
        let me = this;
        this.nav.push(Collections, {});
    }
}

