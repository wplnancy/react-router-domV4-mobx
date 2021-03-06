import { observable, action, useStrict } from 'mobx';
import RouteData from './RouteData';

useStrict(true);

class store {
    @observable routeKey = [];
    @observable parent = [{ name: "首页", path: "/home" }];
    @observable selectedKeys = "1";
    @observable openKeys = ["sub1"];
    @observable loading = false;
    @action addKey = (data, props) => {
        props.history.push(data.key);
        RouteData.forEach(function (x) {
            if (data.key === x.path) {
                this.selectedKeys = x.key;
                this.openKeys[0] = x.parentKey;
            }
        }, this);
        let offer = false;
        this.routeKey.forEach(function (x, i) {
            if (x.key == data.key) {
                offer = true
            }
        }, this);
        this.addBread(data.name);
        if (!offer) {
            this.routeKey.push(data);
        }
    };
    @action deleteKey = (data, props) => {
        this.routeKey.forEach(function (x, i) {
            if (x.key == data.key) {
                this.routeKey.splice(i, 1);

                if (data.key != window.location.pathname) {
                    props.history.push(window.location.pathname)
                    return
                }

                let len = this.routeKey.length;
                this.addBread(len > 0 ? this.routeKey[len - 1].name : "首页");
                let pushData = {
                    name: len > 0 ? this.routeKey[len - 1].name : "首页",
                    key: len > 0 ? this.routeKey[len - 1].key : "home"
                };
                // props.history.push(len > 0 ? this.routeKey[len - 1].key : "home")
                this.addKey(pushData, props)

            }
        }, this);
    };
    @action addBread = (data) => {
        this.parent = [];
        RouteData.forEach(function (x) {
            if (data === x.name) {
                this.parent = x.data;
            }
        }, this);
    }

    @action show = () => {
        this.loading = true;
    }

    @action hide = () => {
        this.loading = false;
    }
}

const menuName = new store();

export default menuName;