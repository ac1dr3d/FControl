<?php

namespace App\Http\Controllers;

use App\FamilyMember;
use App\Http\Requests\StoreFamilyMemberRequest;
use App\User;
use Illuminate\Http\Request;

class FamilyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        if(auth()->user()->id === $user->id){
            if(auth()->user()->is_admin)
                return FamilyMember::orderBy('id','desc')->get();
            else
            return $user->familyMembers()->orderBy('id', 'desc')->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreFamilyMemberRequest $request
     * @param User $user
     * @return FamilyMember
     */
    public function store(StoreFamilyMemberRequest $request, User $user)
    {
        if(auth()->user()->id === $user->id){
            $member = new FamilyMember(
                $request->validated() + [
                    'last_edited_at' => now(),
                    'last_edited_by' => auth()->user()->id,
                ]
            );

            $user->familyMembers()->save($member);
        }
        return $member;
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @param FamilyMember $familyMember
     * @return FamilyMember
     */
    public function show(User $user, FamilyMember $familyMember)
    {
        return $familyMember;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param User $user
     * @param FamilyMember $familyMember
     * @return void
     */
    public function update(StoreFamilyMemberRequest $request, User $user, FamilyMember $familyMember)
    {
        if(auth()->user()->id === $user->id){
            if(auth()->user()->is_admin || $user->familyMembers->contains($familyMember)){
                $familyMember->update(
                    $request->validated() + [
                        'last_edited_at' => now(),
                        'last_edited_by' => auth()->user()->id,
                    ]
                );
            }
        }
        return $familyMember;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @param FamilyMember $familyMember
     * @return bool
     * @throws \Exception
     */
    public function destroy(User $user, FamilyMember $familyMember)
    {
        if ($user->familyMembers->contains($familyMember) || auth()->user()->is_admin) {
            return $familyMember->delete();
        }
    }

}
