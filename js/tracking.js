// --- CẤU HÌNH SUPABASE ---
const SUPABASE_URL = 'https://ldgfmioulzblgkvsvoen.supabase.co';
const SUPABASE_KEY = 'sb_publishable_BZq1QTmrxVXfiSi4fds6NA_xKswwo9A';

const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

async function trackPageView() {
    if (!supabase) return;

    try {
        const { data, error } = await supabase
            .from('page_views')
            .insert([
                {
                    user_agent: navigator.userAgent,
                    view_path: window.location.pathname,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`
                }
            ]);

        if (error) console.error('Tracking Error:', error);
        else console.log('Traffic Tracked ✅');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

// Chạy theo dõi ngay khi tải trang
document.addEventListener('DOMContentLoaded', trackPageView);
