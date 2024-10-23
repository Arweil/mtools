import useLayout from './hooks/useLayout';
import OriginLayoutV2 from './LayoutV2';
import type { LayoutV2Type } from './types';

const LayoutV2 = OriginLayoutV2 as LayoutV2Type;

LayoutV2.useLayout = useLayout;

export default LayoutV2;
