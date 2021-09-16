import { Parallax, } from 'react-parallax';
import { Link } from 'react-router-dom';

import './Landing.css';
import zona_libre_de_colon from '../../assets/img/hangers.jpg'
import Featured from '../Featured/Featured';

const Landing = () => {
    return(
        <div>

        <Parallax blur={2} bgImage={zona_libre_de_colon} bgImageAlt="the cat" strength={300}>
            <div className="parallax_container">
            <div 
                style={{
                width: '100%',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
                top:'40%',
                boxSizing: 'border-box'
                }}
            >
                <div style={{textAlign:'center',}}>
                <div className="parallax_title" >
                    <h1 className='mb-3 fw-bold'  >Envíos a Cuba desde zona libre</h1>
                    <h1 className='mb-3 fw-bold'  >Panamá</h1>
                </div>
                <br/>
                <Link to="/catalogo" className="btn btn-secondary" >Ver catálogo</Link>
                </div>
            </div>
            </div>
        </Parallax>
        <div className='parallax_title2' >
            <h2>Productos más vendidos</h2>
            <p>De nuestra amplia gama de productos estos son los que más han destacado entre nuestros clientes</p>
        </div>
            <Featured />
            
    
    </div>
    );
}

export default Landing;