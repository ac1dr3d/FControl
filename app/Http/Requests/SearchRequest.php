<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'search_option' => 'exclude_if:search_relation,in:დედა,დედა,მამა,შვილი|required|string',
            'search_value' => 'exclude_if:search_relation,in:დედა,დედა,მამა,შვილი|required|string',
        ];
    }
}
