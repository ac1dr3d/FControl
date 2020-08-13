<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SearchRequest;
use App\FamilyMember;

class SearchController extends Controller
{
    public function search(SearchRequest $request)
    {
        $query = FamilyMember::query();
        if (!auth()->user()->is_admin) {
            // თუ admin არ არის, მაშინ წამოიღებს მარტო იმ FamilyMemberებს რომლებიც ამ userს ეკუთვნის
            $query->where('user_id', auth()->user()->id);
        }
        $query->where($request->get('search_option'), 'like', '%' . $request->get('search_value') . '%');
        return $query->orderBy('id', 'desc')->get();
    }
}
