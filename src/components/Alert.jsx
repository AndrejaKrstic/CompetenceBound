import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('info');

  useImperativeHandle(ref, () => ({
    showAlert: (message, variant = 'info') => {
      setMessage(message);
      setVariant(variant);
      setShow(true);
    },
    hideAlert: () => {
      setShow(false);
    }
  }));

  return (
    <div className="fixed-top">
      <BootstrapAlert show={show} variant={variant} onClose={() => setShow(false)} dismissible>
        {message}
      </BootstrapAlert>
    </div>
  );
});

export default Alert;