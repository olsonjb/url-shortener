'use client';
import { useState } from "react";

export function ShortenerForm() {
    const [shortenedUrl, setShortenedUrl] = useState('');

    const onSubmit = async (formData: FormData) => {
        console.log('URL:', formData.get('url'));
        const response = await fetch('/api/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: formData.get('url') }),
        });

        const data = await response.json();
        console.log('DATA:', data);
        setShortenedUrl(data.slug);
    };

    let basePath = undefined;
    if (typeof window !== 'undefined') {
        basePath = window.location.origin;
    }

    return (
        <div className="flex-col space-y-4 justify-center">
            <form className="flex gap-4 items-center justify-center" action={onSubmit}>
                <label htmlFor="url" className="sr-only">
                URL
                </label>
                <input
                name="url"
                type="url"
                placeholder="https://example.com/a-long-url-path"
                className="w-64 p-2 text-black border border-black rounded-md"
                />
                <button
                type="submit"
                className="p-2 text-white rounded-md bg-green-600"
                >
                Shorten
                </button>
            </form>
            <div className="h-7">
                {shortenedUrl && <h3 className="text-center">Shortened URL: <span className="font-bold">{basePath ?? '<Current Page URL>'}/{shortenedUrl}</span></h3>}
            </div>
        </div>
    );
};