export namespace Shared {
	export interface Image {
		height: number;
		uri: string;
		url_list: string[];
		width: number;
	}

	export interface Post {
		anchors: unknown | null;
		author: Shared.User;
		aweme_id: string;
		aweme_type: number;
		bodydance_score: number;
		cha_list: {
			author: {
				ad_cover_url: unknown | null;
				advance_feature_item_order: unknown | null;
				advanced_feature_info: unknown | null;
				bold_fields: unknown | null;
				can_set_geofencing: unknown | null;
				cha_list: unknown | null;
				cover_url: unknown | null;
				events: unknown | null;
				followers_details: unknown | null;
				geofencing: unknown | null;
				homepage_bottom_toast: unknown | null;
				item_list: unknown | null;
				mutual_relation_avatars: unknown | null;
				need_points: unknown | null;
				platform_sync_info: unknown | null;
				relative_users: unknown | null;
				search_highlight: unknown | null;
				type_label: unknown | null;
				user_profile_guide: unknown | null;
				user_tags: unknown | null;
				white_cover_url: unknown | null;
			};
			banner_list: unknown | null;
			cha_attrs: unknown | null;
			cha_name: string;
			cid: string;
			collect_stat: number;
			connect_music: unknown[];
			desc: string;
			extra_attr: { is_live: boolean };
			hashtag_profile: string;
			is_challenge: boolean;
			is_commerce: boolean;
			is_pgcshow: boolean;
			schema: string;
			search_highlight: unknown | null;
			share_info: {
				bool_persist: number;
				share_desc: string;
				share_desc_info: string;
				share_quote: string;
				share_signature_desc: string;
				share_signature_url: string;
				share_title: string;
				share_title_myself: string;
				share_title_other: string;
				share_url: string;
				share_weibo_desc: string;
			};
			show_items: unknown | null;
			sub_type: number;
			type: number;
			user_count: number;
			view_count: number;
		}[];
		challenge_position: unknown | null;
		cmt_swt: boolean;
		collect_stat: number;
		commerce_config_data: unknown | null;
		commerce_info: {
			adv_promotable: boolean;
			auction_ad_invited: boolean;
			with_comment_filter_words: boolean;
		};
		content_desc: string;
		content_desc_extra: unknown[];
		cover_labels: unknown | null;
		create_time: number;
		desc: string;
		desc_language: string;
		disable_search_trending_bar: boolean;
		distance: string;
		distribute_type: number;
		follow_up_publish_from_id: number;
		geofencing: unknown | null;
		geofencing_regions: unknown | null;
		green_screen_materials: unknown | null;
		group_id: string;
		group_id_list: {
			GroupIdList0: unknown | null;
			GroupIdList1: number[];
		};
		has_vs_entry: boolean;
		have_dashboard: boolean;
		hybrid_label: unknown | null;
		image_infos: unknown | null;
		interaction_stickers: unknown | null;
		is_hash_tag: number;
		is_pgcshow: boolean;
		is_preview: number;
		is_relieve: boolean;
		is_top: number;
		is_vr: boolean;
		item_comment_settings: number;
		item_duet: number;
		item_react: number;
		item_stitch: number;
		label_top: Shared.Image;
		label_top_text: unknown | null;
		long_video: unknown | null;
		mask_infos: unknown[];
		misc_info: string;
		music: {
			album: string;
			artists: unknown[];
			audition_duration: number;
			author: string;
			author_deleted: boolean;
			author_position: unknown | null;
			avatar_medium: Shared.Image;
			avatar_thumb: Shared.Image;
			binded_challenge_id: number;
			can_not_reuse: boolean;
			collect_stat: number;
			cover_large: Shared.Image;
			cover_medium: Shared.Image;
			cover_thumb: Shared.Image;
			dmv_auto_show: boolean;
			duration: number;
			external_song_info: boolean;
			extra: string; //json
			id: number;
			id_str: string;
			is_audio_with_cookie: boolean;
			is_author_artist: boolean;
			is_commerce_music: boolean;
			is_matched_metadata: boolean;
			is_original: boolean;
			is_original_sound: boolean;
			is_pgc: boolean;
			lyric_short_position: unknown | null;
			matched_pgc_sound: {
				author: string;
				mixed_author: string;
				mixed_title: string;
				title: string;
			};
			matched_song: {
				author: string;
				chorus_info: {
					duration_ms: number;
					start_ms: number;
				};
				cover_medium: Shared.Image;
				h5_url: string;
				id: string;
				performers: unknown | null;
				title: string;
			};
			mid: string;
			multi_bit_rate_play_info: unknown | null;
			mute_share: boolean;
			offline_desc: string;
			owner_handle: string;
			owner_id: string;
			owner_nickname: string;
			play_url: Shared.Image;
			position: unknown | null;
			prevent_download: boolean;
			preview_end_time: number;
			preview_start_time: number;
			search_highlight: unknown | null;
			sec_uid: string;
			shoot_duration: number;
			source_platform: number;
			status: number;
			strong_beat_url: Shared.Image;
			tag_list: unknown | null;
			title: string;
			user_count: number;
			video_duration: number;
		};
		music_begin_time_in_ms: number;
		music_end_time_in_ms: number;
		need_trim_step: boolean;
		need_vs_entry: boolean;
		nickname_position: unknown | null;
		origin_comment_ids: unknown | null;
		playlist_blocked: boolean;
		position: unknown | null;
		prevent_download: boolean;
		products_info: unknown | null;
		question_list: unknown | null;
		rate: number;
		region: string;
		retry_type: number;
		risk_infos: {
			content: string;
			risk_sink: boolean;
			type: number;
			vote: boolean;
			warn: boolean;
		};
		search_highlight: unknown | null;
		share_info: {
			bool_persist: number;
			share_desc: string;
			share_desc_info: string;
			share_link_desc: boolean;
			share_quote: string;
			share_signature_desc: string;
			share_signature_url: string;
			share_title: string;
			share_title_myself: string;
			share_title_other: string;
			share_url: string;
			share_weibo_desc: string;
			whatapp_desc: string;
		};
		share_url: string;
		sort_label: string;
		statistics: {
			aweme_id: string;
			collect_count: number;
			comment_count: number;
			digg_count: number;
			download_count: number;
			forward_count: number;
			lost_comment_count: number;
			lose_count: number;
			play_count: number;
			share_count: number;
			whatsapp_share_count: number;
		};
		status: {
			allow_comment: boolean;
			allow_share: boolean;
			ameme_id: string;
			download_status: number;
			in_reviewing: boolean;
			is_delete: boolean;
			is_prohibited: boolean;
			private_status: number;
			review_result: { review_status: number };
			reviewed: number;
			self_see: boolean;
		};
		sticker_detail: {
			attributions: unknown | null;
			children: unknown | null;
			id: string;
			linked_anchors: unknown | null;
			name: string;
			owner_id: string;
			sec_uid: string;
			tags: unknown | null;
		};
		stickers: string;
		text_extra: {
			end: number;
			hashtag_id: string;
			hashtag_name: string;
			is_commerce: boolean;
			sec_uid: string;
			start: number;
			type: number;
			user_id: string;
		}[];
		uniqid_position: unknown | null;
		user_digged: number;
		video: {
			ai_dynamic_cover: Shared.Image;
			ai_dynamic_cover_back: Shared.Image;
			animated_cover: Shared.Image;
			big_thumbs: unknown | null;
			bit_rate: {
				bit_rate: number;
				dub_infos: unknown | null;
				gear_name: string;
				is_bytevc1: number;
				play_addr: {
					data_size: number;
					file_cs: string;
					file_hash: string;
					height: number;
					uri: string;
					url_key: string;
					url_list: string[];
					width: number;
				};
				quality_type: number;
			};
			cdn_url_expired: number;
			cover: Shared.Image;
			download_addr: Shared.Image & { data_size: number };
			duration: number;
			dynamic_cover: Shared.Image;
			has_watermark: boolean;
			height: number;
			is_bytevc1: number;
			is_callback: boolean;
			meta: string; //json
			need_set_token: boolean;
			origin_cover: Shared.Image;
			play_addr: {
				data_size: number;
				file_cs: string;
				file_hash: string;
				height: number;
				uri: string;
				url_key: string;
				url_list: string[];
				width: number;
			};
			play_addr_bytevc1: {
				data_size: number;
				file_cs: string;
				file_hash: string;
				height: number;
				uri: string;
				url_key: string;
				url_list: string[];
				width: number;
			};
			play_addr_h264: {
				data_size: number;
				file_cs: string;
				file_hash: string;
				height: number;
				uri: string;
				url_key: string;
				url_list: string[];
				width: number;
			};
			ratio: string;
			tags: unknown | null;
			width: number;
		};
		video_control: {
			allow_download: boolean;
			allow_duet: boolean;
			allow_dynamic_wallpaper: boolean;
			allow_music: boolean;
			allow_react: boolean;
			allow_stitch: boolean;
			draft_progress_bar: number;
			prevent_download_type: number;
			share_type: number;
			show_progress_bar: number;
			timer_status: number;
		};
		video_labels: unknown[];
		video_text: unknown[];
		with_promotional_music: boolean;
		without_watermark: boolean;
	}

	export interface User {
		accept_private_policy: boolean;
		account_region: string;
		ad_cover_url: unknown | null;
		advance_feature_item_order: unknown | null;
		advanced_feature_into: unknown | null;
		apple_account: number;
		authority_status: number;
		avatar_168x168: Shared.Image;
		avatar_300x300: Shared.Image;
		avatar_larger: Shared.Image;
		avatar_medium: Shared.Image;
		avatar_thumb: Shared.Image;
		avatar_uri: string;
		aweme_count: number;
		bind_phone: string;
		bold_field: unknown | null;
		can_set_geofencing: unknown | null;
		cha_list: unknown | null;
		comment_filter_status: number;
		comment_setting: number;
		commerce_user_level: number;
		cover_url: Shared.Image[];
		create_time: number;
		custom_verify: string;
		cv_level: string;
		download_prompt_ts: number;
		download_setting: number;
		duet_setting: number;
		enterprise_verify_reason: string;
		events: unknown | null;
		favoriting_count: number;
		fb_expire_time: number;
		follow_status: number;
		follower_count: number;
		follower_status: number;
		followers_detail: unknown | null;
		following_count: number;
		geofencing: unknown | null;
		google_account: string;
		has_email: boolean;
		has_facebook_token: boolean;
		has_insights: boolean;
		has_orders: boolean;
		has_twitter_token: boolean;
		has_youtube_token: boolean;
		hide_search: boolean;
		homepage_button_toast: unknown | null;
		ins_id: string;
		is_ad_fake: boolean;
		is_block: boolean;
		is_discipline_member: boolean;
		is_phone_binded: boolean;
		is_start: boolean;
		item_list: unknown | null;
		language: string;
		live_agreement: number;
		live_commerce: boolean;
		live_verify: number;
		mention_status: number;
		mutual_relation_avatars: unknown | null;
		need_points: unknown | null;
		need_recommend: number;
		nickname: string;
		original_musician: {
			digg_count: number;
			music_count: number;
			music_used_count: number;
		};
		platform_sync_info: unknown | null;
		prevent_download: boolean;
		react_setting: number;
		region: string;
		relative_users: unknown | null;
		room_id: number;
		search_highlight: unknown | null;
		sec_uid: string;
		secret: number;
		share_info: {
			share_desc: string;
			share_desc_info: Shared.Image;
			share_title: string;
			share_title_myself: string;
			share_title_other: string;
			share_url: string;
			share_weibo_desc: string;
		};
		share_qrcode_uri: string;
		shield_comment_notice: number;
		shield_digg_notice: number;
		shield_follow_notice: number;
		short_id: string;
		show_image_bubble: boolean;
		signature: string;
		special_lock: number;
		status: number;
		stitch_setting: number;
		total_favorited: number;
		tw_expire_time: number;
		twitter_id: string;
		twitter_name: string;
		type_label: unknown | null;
		uid: string;
		unique_id: string;
		unique_id_modify_time: number;
		user_canceled: boolean;
		user_mode: number;
		user_period: number;
		user_profile_guide: unknown | null;
		user_rate: number;
		user_tags: unknown | null;
		verification_type: number;
		verify_info: string;
		video_icon: Shared.Image;
		white_cover_url: unknown | null;
		with_commerce_entry: boolean;
		with_shop_entry: boolean;
		youtube_channel_id: string;
		youtube_channel_title: string;
		youtube_expire_time: number;
	}
}

export namespace PreferredAPI {
	export interface Page<T> {
		has_more: boolean;
		max_cursor: string;
		media: T[];
	}

	export interface UserMetadataResponse {
		avatar_larger: string;
		avatar_medium: string;
		avatar_thumn: string;
		country: string;
		favoriting_count: number;
		follower_count: number;
		following_count: number;
		is_private: boolean;
		is_verified: boolean;
		nickname: string;
		other_social_profiles: Record<string, any>;
		rate: number;
		sec_uid: string;
		short_id: string;
		signature: string;
		total_favorited: number;
		uid: string;
		unique_id: string;
		verification_type: string;
		video_count: number;
	}
}

export namespace BackupAPI {
	export interface Page<T> {
		aweme_list: T[];
		extra: {
			fatal_item_ids: unknown[];
			logid: string;
			now: number;
		};
		has_locate_item: boolean;
		has_more: number;
		log_pb: {
			impr_id: string;
		};
		max_cursor: number;
		min_cursor: number;
		status_code: number;
	}

	export interface UsernameToSecUIDResponse {
		error?: string;
		sec_uid?: string;
		success: boolean;
		user_id?: string;
	}

	export interface UserSearchResponse {
		user_list: Array<{
			user_info: {
				accept_private_policy: boolean;
				account_region: string;
				ad_cover_url: unknown | null;
				advance_feature_info: unknown | null;
				advanced_feature_info: unknown | null;
				apple_account: number;
				authority_status: number;
				avatar_168x168: Shared.Image;
				avatar_300x300: Shared.Image;
				avatar_larger: Shared.Image;
				avatar_medium: Shared.Image;
				avatar_thumb: Shared.Image;
				avatar_uri: string;
				aweme_count: number;
				bind_phone: string;
				birthday: string;
				block_status: number;
				bold_fields: unknown | null;
				can_set_geofencing: unknown | null;
				cha_list: unknown | null;
				comment_filter_status: number;
				comment_setting: number;
				commerce_user_level: number;
				cover_url: Shared.Image[];
				create_time: number;
				custom_verify: string;
				cv_level: string;
				download_prompt_ts: number;
				download_setting: number;
				duet_setting: number;
				enable_direct_message: boolean;
				enterprise_verify_reason: string;
				events: unknown | null;
				favoriting_count: number;
				fb_expire_time: number;
				follow_status: number;
				follower_count: number;
				follower_status: number;
				followers_detail: unknown | null;
				following_count: number;
				geofencing: unknown[];
				google_account: string;
				has_email: boolean;
				has_facebook_token: boolean;
				has_insights: boolean;
				has_orders: boolean;
				has_twitter_token: boolean;
				has_youtube_token: boolean;
				hide_search: boolean;
				homepage_bottom_toast: unknown | null;
				ins_id: string;
				id_ad_fake: boolean;
				is_block: boolean;
				is_discipline_member: boolean;
				is_phone_binded: boolean;
				is_private_account: number;
				is_star: boolean;
				item_list: unknown | null;
				language: string;
				live_agreement: number;
				live_agreement_time: number;
				live_commerce: boolean;
				live_verify: number;
				mention_status: number;
				mutual_relaiton_avatars: unknown | null;
				name_field: string;
				need_points: unknown | null;
				need_recommend: number;
				nickname: string;
				original_musician: {
					digg_count: number;
					music_count: number;
					music_used_count: number;
				};
				platform_sync_info: unknown | null;
				prevent_download: boolean;
				react_setting: number;
				reflow_page_gid: number;
				reflow_page_uid: number;
				region: string;
				relative_users: unknown | null;
				room_id: number;
				search_highlight: unknown | null;
				search_user_desc: string;
				search_user_name: string;
				sec_uid: string;
				secret: number;
				share_info: Record<string, any>;
				share_qrcode_uri: string;
				shield_comment_notice: number;
				shield_digg_notice: number;
				shield_follow_notice: number;
				short_id: string;
				show_image_bubble: boolean;
				signature: string;
				special_lock: number;
				status: number;
				stitch_setting: number;
				total_favorited: number;
				tw_expire_time: number;
				twitter_id: string;
				twitter_name: string;
				type_label: unknown | null;
				uid: string;
				unique_id: string;
				unique_id_modify_time: number;
				user_canceled: boolean;
				user_mode: number;
				user_period: number;
				user_profile_guide: unknown | null;
				user_rate: number;
				user_tags: unknown | null;
				verification_type: number;
				verify_info: string;
				video_icon: Shared.Image;
				white_cover_url: unknown | null;
				with_commerce_entry: boolean;
				with_fusion_shop_entry: boolean;
				youtube_channel_id: string;
				youtube_channel_title: string;
				youtube_expire_time: number;
			};
		}>;
	}
}

export namespace InstagramAPI {
	export interface BasePost {
		can_see_insights_as_brand: boolean;
		can_view_more_preview_comments: boolean;
		can_viewer_reshare: boolean;
		can_viewer_save: boolean;
		caption: {
			bit_flags: number;
			content_type: string;
			created_at: number;
			created_at_utc: number;
			did_report_as_spam: boolean;
			is_covered: boolean;
			media_id: number;
			pk: number;
			private_reply_status: number;
			share_enabled: boolean;
			status: string;
			text: string;
			type: number;
			user: {
				full_name: string;
				is_private: boolean;
				is_verified: boolean;
				pk: number;
				profile_pic_id: string;
				profile_pic_url: string;
				username: string;
			};
			user_id: number;
		};
		caption_is_edited: boolean;
		client_cache_key: string;
		code: string;
		comment_count: number;
		comment_inform_treatment: {
			action_type: unknown | null;
			should_have_inform_treatment: boolean;
			text: string;
			url: unknown | null;
		};
		comment_likes_enabled: boolean;
		comment_threading_enabled: boolean;
		commerciality_status: string;
		deleted_reason: number;
		device_timestamp: number;
		featured_products_cta: unknown | null;
		filter_type: number;
		fundraiser_tag: { has_standalone_fundraiser: boolean };
		has_liked: boolean;
		has_more_comments: boolean;
		has_shared_to_fb: number;
		hide_view_all_comment_entrypoint: boolean;
		id: string;
		inline_composer_display_condition: string;
		inline_composer_imp_trigger_time: number;
		integrity_review_decision: string;
		is_in_profile_grid: boolean;
		is_organic_product_tagging_eligible: boolean;
		is_paid_partnership: boolean;
		is_unified_video: boolean;
		is_visual_reply_commenter_notice_enabled: boolean;
		lat: number;
		like_and_view_counts_disabled: boolean;
		like_count: number;
		lng: number;
		location: {
			address: string;
			city: string;
			external_source: string;
			facebook_places_id: number;
			has_viewer_saved: boolean;
			is_eligible_for_guides: boolean;
			lat: number;
			lng: number;
			name: string;
			pk: number;
			short_name: string;
		};
		max_num_visible_preview_comments: number;
		media_type: number;
		music_metadata: {
			audio_type: unknown | null;
			music_canonical_id: string;
			music_info: unknown | null;
			original_sound_info: unknown | null;
		};
		next_max_id: number;
		organic_tracking_token: string;
		original_media_has_visual_reply_media: boolean;
		owner: {
			account_badges: unknown[];
			fan_club_info: {
				fan_club_id: unknown | null;
				fan_club_name: unknown | null;
			};
			friendship_status: {
				following: boolean;
				is_bestie: boolean;
				is_feed_favorite: boolean;
				is_restricted: boolean;
				outgoing_request: boolean;
			};
			full_name: string;
			has_anonymous_profile_picture: boolean;
			has_highlight_reels: boolean;
			is_favorite: boolean;
			is_private: boolean;
			is_unpublished: boolean;
			is_verified: boolean;
			latest_reel_media: number;
			pk: number;
			profile_pic_id: string;
			profile_pic_url: string;
			transparency_product_enabled: boolean;
			username: string;
		};
		photo_of_you: boolean;
		pk: number;
		preview_comments: {
			bit_flags: number;
			comment_like_count: number;
			content_type: string;
			created_at: number;
			created_at_utc: number;
			did_report_as_spam: boolean;
			has_liked_comment: boolean;
			is_covered: boolean;
			media_id: number;
			pk: number;
			private_reply_status: number;
			share_enabled: boolean;
			status: string;
			text: string;
			type: number;
			user: {
				full_name: string;
				is_private: boolean;
				is_verified: boolean;
				pk: number;
				profile_pic_id: string;
				profile_pic_url: string;
				username: string;
			};
			user_id: number;
		}[];
		product_type: string;
		profile_grid_control_enabled: boolean;
		sharing_friction_info: {
			bloks_app_url: unknown | null;
			sharing_friction_payload: unknown | null;
			should_have_sharing_friction: boolean;
		};
		should_request_ads: boolean;
		taken_at: number;
		top_likers: unknown[];
		user: {
			account_badges: unknown[];
			fan_club_info: {
				fan_club_id: unknown | null;
				fan_club_name: unknown | null;
			};
			friendship_status: {
				following: boolean;
				is_bestie: boolean;
				is_feed_favorite: boolean;
				is_restricted: boolean;
				outgoing_request: boolean;
			};
			full_name: string;
			has_anonymous_profile_picture: boolean;
			has_highlight_reels: boolean;
			is_favorite: boolean;
			is_private: boolean;
			is_unpublished: boolean;
			is_verified: boolean;
			latest_reel_media: number;
			pk: number;
			profile_pic_id: string;
			profile_pic_url: string;
			transparency_product_enabled: boolean;
			username: string;
		};
		usertags: {
			in: {
				categories: unknown | null;
				duration_in_video_in_sec: unknown | null;
				position: [number, number];
				show_category_of_user: boolean;
				start_time_in_video_in_sec: number | null;
				user: {
					full_name: string;
					is_private: boolean;
					is_verified: boolean;
					pk: number;
					profile_pic_id: string;
					profile_pic_url: string;
					username: string;
				}
			}[];
		};
	}

	interface ImageVersions2 {
		candidates: {
			estimated_scans_sizes: number[];
			height: number;
			scans_profile: string;
			url: string;
			width: number;
		}[];
	}

	export interface PhotoPost extends BasePost {
		image_versions2: {
			candidates: {
				estimated_scans_sizes: number[];
				height: number;
				scans_profile: string;
				url: string;
				width: number;
			}[];
		};
		original_height: number;
		original_width: number;
	}

	export interface UserTag {
		in: {
			categories: unknown | null;
			duration_in_video_in_sec: unknown | null;
			position: [number, number];
			show_category_of_user: boolean;
			start_time_in_video_in_sec: unknown | null;
			user: {
				full_name: string;
				is_private: boolean;
				is_verified: boolean;
				pk: number;
				profile_pic_id: string;
				profile_pic_url: string;
				username: string;
			}
		}[];
	}

	export interface CarouselPost extends BasePost {
		carousel_media_count: number;
		carousel_media: {
			carousel_parent_id: string;
			commerciality_status: string;
			id: string;
			image_versions2: ImageVersions2;
			media_type: number; // 1
			original_height: number;
			original_width: number;
			pk: number;
			usertags: UserTag[];
		}[];
	}

	export interface IGTVPost extends BasePost {
		has_audio: boolean;
		igtv_exists_in_viewer_series: boolean;
		image_versions: ImageVersions2 & {
			additional_candidates: {
				first_frame: {
					height: number;
					scans_profile: string;
					url: string;
					width: number;
				};
				igtv_first_frame: {
					height: number;
					scans_profile: string;
					url: string;
					width: number;
				};
			};
			original_width: number;
		};
		is_dash_eligible: number;
		is_post_live: boolean;
		media_cropping_info: {
			feed_preview_crop: unknown | null;
			square_crop: unknown | null;
			three_by_four_preview_crop: unknown | null;
			thumbnails: {
				file_size_kb: number;
				igtv_exists_in_viewer_series: boolean;
				max_thumbnails_per_sprite: number;
				rendered_width: number;
				sprite_height: number;
				sprite_urls: string[];
				sprite_width: number;
				thumbnail_duration: number;
				thumbnail_height: number;
				thumbnail_width: number;
				thumbnails_per_row: number;
				total_thumbnail_num_per_sprite: number;
				video_length: number;	
			};
		};
		nearly_complete_copyright_match: boolean;
		number_of_qualities: number;
		original_height: number;
		original_width: number;
		thumbnails: {
			file_size_kb: number;
			igtv_exists_in_viewer_series: boolean;
			max_thumbnails_per_sprite: number;
			rendered_width: number;
			sprite_height: number;
			sprite_urls: string[];
			sprite_width: number;
			thumbnail_duration: number;
			thumbnail_height: number;
			thumbnail_width: number;
			thumbnails_per_row: number;
			total_thumbnail_num_per_sprite: number;
			video_length: number;	
		};
		title: string;
		video_codec: string;
		video_dash_manifest: string;
		video_duration: number;
		video_subtitles_confidence: number;
		video_subtitles_uri: string;
		video_versions: {
			height: number;
			id: string;
			type: number;
			url: string;
			width: number;
		}[];
		view_count: number;
	}

	export type Post = PhotoPost | CarouselPost | IGTVPost;

	export interface User {
		biography: string;
		bio_links: unknown[];
		biography_with_entities: {
			raw_text: string;
			entities: unknown[];
		};
		blocked_by_viewer: boolean;
		restricted_by_viewer: boolean;
		country_block: boolean;
		external_url: unknown | null;
		external_url_linkshimmed: unknown | null;
		edge_followed_by: {
			count: number;
		};
		fbid: string;
		followed_by_viewer: boolean;
		edge_follow: {
			count: number;
		};
		follows_viewer: boolean;
		full_name: string;
		group_metadata: unknown | null;
		has_ar_effects: boolean;
		has_clips: boolean;
		has_guides: boolean;
		has_channel: boolean;
		has_blocked_viewer: boolean;
		highlight_reel_count: number;
		has_requested_viewer: boolean;
		hide_like_and_view_counts: boolean;
		id: string;
		is_business_account: boolean;
		is_eligible_to_view_account_transparency: boolean;
		is_professional_account: boolean;
		is_supervision_enabled: boolean;
		is_guardian_of_viewer: boolean;
		is_supervised_by_viewer: boolean;
		is_supervised_user: boolean;
		is_embeds_disabled: boolean;
		is_joined_recently: boolean;
		guardian_id: unknown | null;
		business_address_json: unknown | null;
		business_contact_method: string;
		business_email: unknown | null;
		business_phone_number: unknown | null;
		business_category_name: unknown | null;
		overall_category_name: unknown | null;
		category_enum: unknown | null;
		category_name: string;
		is_private: boolean;
		is_verified: boolean;
		edge_mutual_followed_by: {
			count: number;
			edges: unknown[];
		};
		profile_pic_url: string;
		profile_pic_url_hd: string;
		requested_by_viewer: boolean;
		should_show_category: boolean;
		should_show_public_contacts: boolean;
		state_controlled_media_country: unknown | null;
		location_transparency_country: unknown | null;
		transparency_label: unknown | null;
		transparency_product: string;
		username: string;
		connected_fb_page: unknown | null;
		pronouns: unknown[];
		edge_felix_video_timeline: {
			count: number;
			page_info: {
				has_next_page: boolean;
				end_cursor: unknown | null;
			};
			edges: unknown[];
		};
		edge_owner_to_timeline_media: {
			count: number;
			page_info: {
				has_next_page: boolean;
				end_cursor: unknown | null;
			};
			edges: unknown[];
		};
		edge_saved_media: {
			count: number;
			page_info: {
				has_next_page: boolean;
				end_cursor: unknown | null;
			};
			edges: unknown[];
		};
		edge_media_collections: {
			count: number;
			page_info: {
				has_next_page: boolean;
				end_cursor: unknown | null;
			};
			edges: unknown[];
		};
	}
}