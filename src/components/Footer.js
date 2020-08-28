import React from 'react'
import '../css/Footer.css'
import { specialist } from '../util/content'
import { Link } from 'react-router-dom'

import { convertString } from '../util/Validator'

export default function () {
  return (
    <div>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                Quisque posuere rhoncus erat, sit amet aliquet augue. Donec eros
                massa, gravida ac lectus et, pharetra interdum lectus. Sed vel
                scelerisque quam, id fringilla ante. Vivamus sagittis velit quis
                dictum ultricies.
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="doctor">Bác sĩ</Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Chuyên khoa</h6>
              <ul className="footer-links">
                {specialist.map((item) => (
                  <li key={item.key}>
                    <Link
                      to={`/specialist/${item.key}-${convertString(
                        item.value
                      )}`}
                    >
                      {item.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2020 All Rights Reserved by Neel
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
