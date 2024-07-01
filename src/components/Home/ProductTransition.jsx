// ProductTransition.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './ProductTransition.module.css';

const ProductTransition = ({ children, currentPage }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={currentPage}
        classNames={{
          enter: styles.productTransitionEnter,
          enterActive: styles.productTransitionEnterActive,
          exit: styles.productTransitionExit,
          exitActive: styles.productTransitionExitActive,
        }}
        timeout={300}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default ProductTransition;