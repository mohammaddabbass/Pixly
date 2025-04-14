<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('login_histories', function (Blueprint $table) {
            $table->decimal('latitude', 10, 7)->nullable()->after('user_agent');
            $table->decimal('longitude', 10, 7)->nullable()->after('latitude');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
