import { useEffect, useState } from "react";
import useForm from "./useForm";

// Restore if running from next.js
// import Router from 'next/router';

// confirm before leaving.
export default function useConfirm(message = "Exit without saving changes?") {
  const form = useForm();
  const [confirm, setConfirm] = useState(message);

  useEffect(() => {
    if (!confirm) {
      return;
    }

    const message = confirm;
    /* // restore this code if running from within next.js
    const routeChangeStart = (url) => {
      if (Router.asPath !== url && form.changed && !window.confirm(message)) {
        // Router.events.emit('routeChangeError');
        setTimeout(() => {
          Router.router.abortComponentLoad();
          // Router.replace(Router, Router.asPath);
        });
        // eslint-disable-next-line no-throw-literal
        // throw 'Abort route change. Please ignore this error.';
      }
    };
    */

    const beforeunload = (e) => {
      if (form.changed) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }

      return null;
    };

    // Restore if running from next.js
    // Router.events.on('routeChangeStart', routeChangeStart);
    window.addEventListener("beforeunload", beforeunload);

    return () => {
      // Restore if running from next.js
      // Router.events.off('routeChangeStart', routeChangeStart);
      window.removeEventListener("beforeunload", beforeunload);
    };
  }, [form, confirm]);

  return setConfirm;
}
