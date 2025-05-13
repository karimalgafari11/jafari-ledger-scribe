
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.41.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // تعامل مع طلبات CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // جلب المتغيرات البيئية
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('عدم توفر متغيرات البيئة المطلوبة');
    }

    // إنشاء عميل Supabase بصلاحيات الخدمة
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // جلب أحدث إصدار
    const { data: latestVersion, error: versionError } = await supabase
      .from('software_versions')
      .select('*')
      .order('release_date', { ascending: false })
      .limit(1)
      .single();

    if (versionError) {
      throw versionError;
    }

    // جلب جميع المستخدمين النشطين
    const { data: activeUsers, error: usersError } = await supabase
      .from('profiles')
      .select('id, email, full_name, is_active')
      .eq('is_active', true);

    if (usersError) {
      throw usersError;
    }

    // جلب سجل التحديثات للتحقق من المستخدمين الذين لم يثبتوا التحديث الأخير
    const { data: userUpdates, error: updatesError } = await supabase
      .from('user_updates')
      .select('user_id, version_id')
      .eq('version_id', latestVersion.id);

    if (updatesError) {
      throw updatesError;
    }

    // تحديد المستخدمين الذين لم يثبتوا التحديث الأخير
    const userIdsWithUpdate = new Set(userUpdates.map(update => update.user_id));
    const usersWithoutUpdate = activeUsers.filter(user => !userIdsWithUpdate.has(user.id));

    // إرسال إشعارات للمستخدمين الذين لم يثبتوا التحديث الأخير
    for (const user of usersWithoutUpdate) {
      // إضافة إشعار للمستخدم
      await supabase.from('notifications').insert({
        user_id: user.id,
        title: `تحديث جديد متاح: ${latestVersion.version}`,
        message: latestVersion.description || 'يتوفر تحديث جديد للنظام، يرجى تثبيته للاستفادة من المميزات الجديدة.',
        event_type: 'system_update',
        priority: latestVersion.requires_update ? 'high' : 'medium',
        channel: 'in-app',
        read: false,
        related_entity_id: latestVersion.id,
        related_entity_type: 'software_version'
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `تم إرسال إشعارات التحديث إلى ${usersWithoutUpdate.length} مستخدم`,
        users_notified: usersWithoutUpdate.length,
        latest_version: latestVersion.version,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
