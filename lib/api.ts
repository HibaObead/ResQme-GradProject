export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const fetcher = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'حدث خطأ في الاتصال بالسيرفر');
    }

    return res.json();
};
