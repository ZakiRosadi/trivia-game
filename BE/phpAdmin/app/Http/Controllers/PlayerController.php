<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PlayerController extends Controller
{
    public function findAll(Request $request): JsonResponse
    {
        $players = DB::table('players')->get();

        return response()->json($players, 200);
    }

    public function findById(Request $request, string $id): JsonResponse
    {
        $player = DB::table('players')->where('id', '=', $id)->first();

        return response()->json($player, 200);
    }

    public function addDiamond(Request $request, string $id): JsonResponse
    {
        $diamond = $request->input("diamond");

        $result = DB::table('players')->where('id', '=', $id)
            ->increment('diamond', $diamond);

        if($result == 1) return response()->json(['message' => 'success'], 200);
        else return response()->json(['message' => 'failed'], 500);
    }

    public function reduceDiamond(Request $request, string $id): JsonResponse
    {
        $diamond = $request->input("diamond");

        $result = DB::table('players')->where('id', '=', $id)
            ->decrement('diamond', $diamond);

        if($result == 1) return response()->json(['message' => 'success'], 200);
        else return response()->json(['message' => 'failed'], 500);
    }

    public function updateScore(Request $request, string $id): JsonResponse
    {
        $newScore = $request->input("score");

        $oldScore = DB::table('players')->where('id','=',$id)
            ->value('highest_score');


        if($newScore > $oldScore) {
            $result = DB::table('players')->where('id', '=', $id)
                ->update(['highest_score' => $newScore]);
            if($result == 1) return response()->json(['message' => 'success'], 200);
            else return response()->json(['message' => 'failed'], 500);
        }

        $result = DB::table('players')->where('id', '=', $id)
            ->increment('total_score', $newScore);

        if($result == 1) return response()->json(['message' => 'success'], 200);
        else return response()->json(['message' => 'failed'], 500);
    }

    public function updateAvatar(Request $request, string $id): JsonResponse
    {
        $avatar_id = $request->input('avatar_id');
        $avatar_image = DB::table('avatars')->where('id', '=', $avatar_id)
            ->value('image');

        $result = DB::table('players')->where('id', '=', $avatar_id)
            ->update(['active_avatar' => $avatar_image]);

        DB::table('user_avatar')->insertOrIgnore([
            'player_id' => $id, 'avatar_id' => $avatar_id
        ]);

        if($result == 1) return response()->json(['message' => 'success'], 200);
        else return response()->json(['message' => 'failed'], 500);
    }

}