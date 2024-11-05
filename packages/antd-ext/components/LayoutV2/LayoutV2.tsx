import React from 'react';
import { useMapTheme } from '../utils';
import Hermes from './Layout/Hermes';
import Zeus from './Layout/Zeus';
import hermesStyle from './styles/layoutHermes';
import zeusStyle from './styles/layoutZeus';
import type { LayoutV2Props } from './types';

const LayoutV2: React.FC<LayoutV2Props> = props => {
  const { theme: customTheme, className, ...restProps } = props;
  const { classes, theme } = useMapTheme({
    theme: customTheme,
    className,
    emotioncss: {
      hermes: hermesStyle,
      zeus: zeusStyle,
    },
  });

  const Comp = theme === 'hermes' ? Hermes : Zeus;

  return <Comp {...restProps} className={classes} />;
};

export default LayoutV2;
