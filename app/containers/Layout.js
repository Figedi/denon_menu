import React from 'react';
import type { Children } from 'react';
import { connect } from 'react-redux';

import * as mapDispatchToProps from '../actions/electron';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Props = {
  children: Children,
  buttonLink: string,
  quit: () => void
};

const Layout = ({ buttonLink, children, quit }: Props) =>
  (<div className="window window--flex">
    <Navbar to={buttonLink} />
    {children}
    <Footer onQuit={quit} />
  </div>);

export default connect(null, mapDispatchToProps)(Layout);
