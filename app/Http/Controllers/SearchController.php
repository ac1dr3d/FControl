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
            $query->where('user_id', auth()->user()->id);
        }
        if($request->get('search_option') && $request->get('search_value')){
            if($request->get('search_option')!=='first_last_name')
            $query->where($request->get('search_option'), 'like', '%' . $request->get('search_value') . '%');
            else
                $query->where('firstname', 'like', '%' . explode(' ', $request->get('search_value'))[0] . '%')->where('lastname', 'like',
                 '%' . explode(' ', $request->get('search_value'))[0] . '%');
        }
        if($request->get('search_relation')){
            $query->where('relation', 'like', '%' . $request->get('search_relation') . '%');
        }
        return $query->orderBy('id', 'desc')->get();
    }
}
