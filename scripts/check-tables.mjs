import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testTables() {
  const tables = ["templates", "invitations", "wishes", "music_library"];
  console.log("Checking database tables...");

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("id").limit(1);
    if (error) {
      console.log(`❌ Table '${table}': NOT FOUND or error (${error.message})`);
    } else {
      console.log(`✅ Table '${table}': READY (found ${data.length} row(s))`);
    }
  }
}

testTables().catch(console.error);

