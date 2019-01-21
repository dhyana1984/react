import React,{Component} from 'react';
//错误边界，捕获子组件的错误并对其做处理的组件
export default class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state= {hasError: false};
    }


    componentDidCatch(error,info){
        //显示错误UI
        this.setState({hasError: true});
        //同时输出错误日志
        console.log(error, info);
    }

    render(){
        if(this.state.hasError){
            return <h1>Oops, something went wrong.</h1>
        }
        return this.props.children
    }
}

