import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Switch } from 'antd';
import { Link, Route, Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import App from './app';
import './admin.css';

import logo from '../assets/logo.png';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


@inject("store")
class Admin extends React.Component {
  state = {
    collapsed: false,
    theme: true,
    name: ""
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.store.fetchData.name });
  }


  render() {
    // 随主题颜色变化
    const color = this.state.theme ? "rgba(255, 255, 255, 0.67)" : "rgba(0,0,0,0.67)";
    const img = !this.state.collapsed ?
      {
        width: "40px",
        marginRight: 8,
      }
      :
      {
        width: " 28px",
        margin: "6px 7px",
      }

    return (
      <Layout className="home">
        <Sider
          collapsed={this.state.collapsed}
          style={{ backgroundColor: this.state.theme ? "#404040" : "#fff" }}
        >
          {/* logo */}
          <div className="homeLogo">
            <img src={logo} alt="logo" style={img} />
            <span style={{ color: color }}>manage</span>
          </div>
          <Menu theme={this.state.theme ? "dark" : "light"} defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/home/app" style={{ color: color }}>
                <Icon type="pie-chart" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/home" style={{ color: color }}>
                <Icon type="desktop" />
                <span>菜单页</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
          {/* 底部菜单主题修改 */}
          <div className="SilderEdit" style={{ display: this.state.collapsed ? "none" : "" }}>
            <Icon type="bulb" style={{ color: color }} />
            <span style={{ color: color, marginLeft: 5 }}>选择主题</span>
            <Switch
              style={{ marginLeft: 10 }}
              defaultChecked={true}
              checkedChildren="dark"
              unCheckedChildren="light"
              onChange={(value) => {
                this.setState({
                  theme: value
                });
              }} />
          </div>

        </Sider>
        <Layout >
          <div className="contentTitle">
            <div
              className="_3sSwc"
              onClick={() => {
                let collapsed = this.state.collapsed;
                this.onCollapse(!collapsed);
              }}
            >
              <Icon type={!this.state.collapsed ? "menu-fold" : "menu-unfold"} />
            </div>
            <span>{this.state.name}</span>
          </div>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route path="/home/app" component={App} />
            </div>
          </Content>
        </Layout>
      </Layout >
    );
  }
}

export default Admin;