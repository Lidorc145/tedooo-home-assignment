// react-fb-image-grid.d.ts
declare module 'react-fb-image-grid' {
    import * as React from 'react';

    interface FbImageLibraryProps {
        images: string[];
        hideOverlay: boolean;
        onClickEach: ()=>void;
    }

    const FbImageLibrary: React.FC<FbImageLibraryProps>;
    export default FbImageLibrary;
}
