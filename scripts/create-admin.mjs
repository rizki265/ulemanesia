import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const adminEmail = process.argv[2] || "admin@ulemanesia.com";
  const adminPassword = process.argv[3] || "Admin123456!";

  console.log(`Checking/Creating admin user: ${adminEmail}`);

  // List existing users
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("Error listing users:", listError.message);
    return;
  }

  const existing = listData.users.find((u) => u.email === adminEmail);
  if (existing) {
    console.log(`User ${adminEmail} already exists. Updating password...`);
    const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
      password: adminPassword,
      email_confirm: true,
    });
    if (updateError) {
      console.error("Error updating password:", updateError.message);
    } else {
      console.log(`Password for ${adminEmail} updated successfully to: ${adminPassword}`);
    }
    return;
  }

  // Create new user
  const { data: createData, error: createError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
  });

  if (createError) {
    console.error("Error creating admin user:", createError.message);
  } else {
    console.log("Admin user created successfully!");
    console.log(`Email   : ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  }
}

main().catch(console.error);
