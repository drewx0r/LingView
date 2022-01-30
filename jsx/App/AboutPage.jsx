import React from 'react';
import { ENGLISH, ESPANOL, FRANCAIS } from './locale/LocaleConstants.jsx';
import { TranslatableText } from './locale/TranslatableText.jsx'

const aboutPageJSX = {
  [ENGLISH]:
    <div>
      <p>This is a test instance to see if LingView will work well as a viewer for the Tunica language corpus.</p>
    </div>,
  [ESPANOL]:
    <div>
      <p>Ingrese el contenido aquí :) </p>
    </div>,
  [FRANCAIS]:
    <div>
      <p>Saisissez le contenu ici :) </p>
    </div>,
};

export function AboutPage() {
  return <TranslatableText dictionary={aboutPageJSX} />;
}
