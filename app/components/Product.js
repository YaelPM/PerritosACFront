import React from 'react'


class Product extends React.Component{
    constructor() {
        super();
        this.state={
            descripcion: false
        }
    }
    change(){
        this.setState({
            descripcion: !this.state.descripcion
        })
    }

    render() {
        return(
            <div className="card">
                    <div className="card-body">
                        <Choose>
                            <When condition={this.state.descripcion}>
                                <p>{this.props.descripcion}</p>
                                <a onClick={this.change.bind(this)} className="btn btn-primary">View More</a>
                            </When>
                            <When condition={!this.state.descripcion}>
                                <img src={this.props.imagen} alt=""/>
                                <h5 className="card-title">{this.props.nombre}</h5>
                                <p className="card-text">${this.props.precio}     Cantidad: {this.props.cantidad}</p>
                                <a onClick={this.change.bind(this)} className="btn btn-primary">View More</a>
                            </When>
                        </Choose>
                    </div>
            </div>
        )
    }
}
export default Product;