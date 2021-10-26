import React from 'react'

class Mascota extends React.Component{
    constructor() {
        super();
    }

    render() {
        return(
            <div className="card">
                    <div className="card-body">
                            <img className={"img-thumbnail"} src={this.props.imagen} alt=""/>
                            <h5 className="card-title">{this.props.nombre}</h5>
                    </div>
                    <div className={"card-footer"}>
                        
                    </div>
            </div>
        )
    }
}
export default Mascota;