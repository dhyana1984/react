import React,{Component} from "react";

//asyncComponent接收一个函数参数importComponent，importComponent通过import()语法动态导入模块
//在AsyncComponent被挂载后，importComponent就会被调用，进而触发动态导入模块的动作
export default function asyncComponent(importComponent){
    class AsyncComponent extends Component{
        constructor(props){
            super(props);
            this.state={
                component : null //动态加载的组件
            }
        }

        componentDidMount(){
            importComponent().then(mod => {
                this.setState({
                    //兼容ES6和CommonJS的模块
                    component:mod.default? mod.default :mod
                })
            })
        }

        render(){
            //渲染动态加载的组件
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}