import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {

    render() {

        return (
                <div className="footer">
                    <p className="footer-info">
                        <span class="aw-footer-disclaimer">&copy; 2018 Caretronics It Solutions S.A.. 
                            Todos os direitos reservados.</span>
                    </p>
                </div>

                );
    }
}
