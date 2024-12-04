import React from 'react';
import { MDBFooter, MDBContainer, MDBBtn} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Footer() {
    return (
        <MDBFooter className='bg-dark text-center text-white tracking-wider' style={{zIndex: '2'}}>
            <MDBContainer className='p-2 pb-0'>
                <section>
                    <MDBBtn outline color="light" floating className='m-1' href='https://www.linkedin.com/in/jonatas-de-assis-pacheco-80a474260/' target="_blank" role='button'>
                        <i className="bi bi-linkedin fs-3"></i>
                    </MDBBtn>
                    <MDBBtn outline color="light" floating className='m-1' href='https://github.com/1footguy' target="_blank" role='button'>
                        <i className="bi bi-github fs-3"></i>
                    </MDBBtn>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: '#00000033' }}>
            &copy; Criado por Jonatas de Assis - 2024
            </div>
        </MDBFooter>
    );
}
