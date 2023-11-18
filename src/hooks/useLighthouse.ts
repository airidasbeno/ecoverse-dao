import { useState, useCallback } from 'react';

import lighthouse from '@lighthouse-web3/sdk';

const useLighthouseTextUpload = () => {
    const [uploadStatus, setUploadStatus] = useState<{ loading: boolean, error: any, data: any }>({ loading: false, error: null, data: null });

    const uploadText = useCallback(async (text: string, apiKey: string, name: string) => {
        setUploadStatus({ loading: true, error: null, data: null });

        try {
            const response = await lighthouse.uploadText(text, apiKey, name);
            setUploadStatus({ loading: false, error: null, data: response.data });
        } catch (error) {
            setUploadStatus({ loading: false, error, data: null });
        }
    }, []);

    return [uploadText, uploadStatus];
};

export default useLighthouseTextUpload;
