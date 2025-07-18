// Admin.js
import React, { useState, useEffect } from 'react';

function Admin({ setLabel, setLogoUrl }) {
  const [previewLabel, setPreviewLabel] = useState(localStorage.getItem('site_label') || '');
  const [previewLogo, setPreviewLogo] = useState(localStorage.getItem('site_logo') || '');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if (!previewLogo) {
      setPreviewLogo('/careteam_logo_v2.png');
    }
  }, [previewLogo]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please upload a valid image file.');
      return;
    }
    setFileError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreviewLogo(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem('site_label', previewLabel);
    localStorage.setItem('site_logo', previewLogo);
    setLabel(previewLabel);
    setLogoUrl(previewLogo);
    alert('Branding updated!');
  };

  const handleReset = () => {
    const defaultLogo = '/careteam_logo_v2.png';
    const defaultLabel = 'CARETEAM Plus';
    localStorage.removeItem('site_label');
    localStorage.removeItem('site_logo');
    setPreviewLogo(defaultLogo);
    setPreviewLabel(defaultLabel);
    setLabel(defaultLabel);
    setLogoUrl(defaultLogo);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Branding Settings</h2>
      <div style={{ marginBottom: 20 }}>
        <label>
          <strong>Site Label:</strong>
          <input
            type="text"
            value={previewLabel}
            onChange={(e) => setPreviewLabel(e.target.value)}
            style={{ marginLeft: 10, width: 300 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label>
          <strong>Logo Image:</strong>
          <input type="file" accept="image/*" onChange={handleLogoChange} style={{ marginLeft: 10 }} />
        </label>
        {fileError && <div style={{ color: 'red' }}>{fileError}</div>}
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3>Preview:</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={previewLogo} alt="preview logo" style={{ height: 80, marginRight: 20 }} />
          <span style={{ fontSize: '1.5rem' }}>{previewLabel}</span>
        </div>
      </div>
      <button onClick={handleSave} style={{ marginRight: 10, padding: '8px 16px' }}>
        Save Branding
      </button>
      <button onClick={handleReset} style={{ padding: '8px 16px' }}>
        Reset to Default
      </button>
    </div>
  );
}

export default Admin;
          