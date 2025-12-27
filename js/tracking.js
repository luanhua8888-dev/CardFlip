// --- CẤU HÌNH SUPABASE ---
const SUPABASE_URL = 'https://ldgfmioulzblgkvsvoen.supabase.co';
const SUPABASE_KEY = 'sb_publishable_BZq1QTmrxVXfiSi4fds6NA_xKswwo9A';

const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

async function trackPageView() {
    if (!supabase) return;

    try {
        console.log('Đang thử kết nối Supabase...');
        // 1. Lưu lượt truy cập mới
        const { error: insertError } = await supabase
            .from('page_views')
            .insert([
                {
                    user_agent: navigator.userAgent,
                    view_path: window.location.pathname,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`
                }
            ]);

        if (insertError) {
            console.error('Lỗi khi lưu lượt truy cập:', insertError.message);
        }

        // 2. Lấy TỔNG số lượng lượt truy cập từ bảng
        const { count, error: countError } = await supabase
            .from('page_views')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Lỗi khi đếm lượt truy cập:', countError.message);
        } else if (count !== null) {
            console.log('Tổng lượt truy cập hiện tại:', count);
            document.getElementById('visit-count').textContent = count;
        }

    } catch (err) {
        console.error('Không thể kết nối cơ sở dữ liệu:', err);
    }
}

// Chạy theo dõi ngay khi tải trang
document.addEventListener('DOMContentLoaded', trackPageView);
