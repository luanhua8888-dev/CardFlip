// --- CẤU HÌNH SUPABASE ---
const SUPABASE_URL = 'https://ldgfmioulzblgkvsvoen.supabase.co';
const SUPABASE_KEY = 'sb_publishable_BZq1QTmrxVXfiSi4fds6NA_xKswwo9A';

const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

async function trackPageView() {
    if (!supabase) return;

    try {
        // 1. Lưu lượt truy cập mới
        await supabase
            .from('page_views')
            .insert([
                {
                    user_agent: navigator.userAgent,
                    view_path: window.location.pathname,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`
                }
            ]);

        // 2. Lấy TỔNG số lượng lượt truy cập từ bảng
        const { count, error } = await supabase
            .from('page_views')
            .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
            document.getElementById('visit-count').textContent = count;
        }

    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

// Chạy theo dõi ngay khi tải trang
document.addEventListener('DOMContentLoaded', trackPageView);
