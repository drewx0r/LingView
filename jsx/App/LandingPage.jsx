import React from 'react';
import { ENGLISH, ESPANOL, FRANCAIS } from './locale/LocaleConstants.jsx';
import { TranslatableText } from './locale/TranslatableText.jsx'

const landingPageJSX = {
  [ENGLISH]:
    <div>
      <p>Welcome! This website is powered by LingView. Click <a href='#/index'>"Index of Texts"</a> to see some example Tunica texts.</p>

    </div>,
  [ESPANOL]:
    <div>
      <p>¡Bienvenido! Este sitio web funciona con LingView. Haga clic <a href='#/index'>"Índice de textos"</a> para ver algunos textos de ejemplo. </p>
    </div>,
  [FRANCAIS]:
    <div>
      <p>Bienvenue! Ce site Web est alimenté par LingView. Cliquez <a href='#/index'>"Index des Textes"</a> pour voir quelques exemples de textes. </p>
    </div>,
};

export function LandingPage() {
  return <TranslatableText dictionary={landingPageJSX} />;
}
