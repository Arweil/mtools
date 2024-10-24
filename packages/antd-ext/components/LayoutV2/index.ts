import useLayout from './hooks/useLayout';
import OriginLayoutV2 from './LayoutV2';
import type { LayoutV2Type } from './types';

type LayoutV2 = LayoutV2Type;
const LayoutV2 = OriginLayoutV2 as LayoutV2;

LayoutV2.useLayout = useLayout;

export default LayoutV2;
