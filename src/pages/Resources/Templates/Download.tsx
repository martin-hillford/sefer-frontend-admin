import { Download } from 'sefer/icons';
import { Button } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Request as Req, useRequest } from 'sefer-fetch';
import React, { useState } from 'react';

// Todo: update this code when the fetch library provide an async useBlob
export const DownloadButton = () => {
  const terms = useLocalization(localization);
  const [ start, setStart ] = useState(false)

  const download = () => setStart(true);
  return (
    <>
      {start && <Downloader />}
    <Button onClick={download} label={terms.download} icon={<Download size={13} />} />
    </>
  )
}

const Downloader = React.memo(() => {

  const request = { method: 'get', action: '/admin/templates/download', responseType: 'blob'  };
  const response = useRequest(request as Req);

  const body = response?.body as Blob;
  if(!body) return;

  const blobUrl = URL.createObjectURL(body);
  const a = document.createElement("a"); a.download = "templates.zip";  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);

  return null;
});





