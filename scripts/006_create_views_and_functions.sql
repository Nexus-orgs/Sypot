-- Create view for posts with author info and stats
create or replace view public.posts_with_details as
select 
  p.id,
  p.content,
  p.image_url,
  p.created_at,
  p.updated_at,
  pr.id as author_id,
  pr.username as author_username,
  pr.display_name as author_display_name,
  pr.avatar_url as author_avatar_url,
  coalesce(l.like_count, 0) as like_count,
  coalesce(c.comment_count, 0) as comment_count
from public.posts p
join public.profiles pr on p.author_id = pr.id
left join (
  select post_id, count(*) as like_count
  from public.likes
  group by post_id
) l on p.id = l.post_id
left join (
  select post_id, count(*) as comment_count
  from public.comments
  group by post_id
) c on p.id = c.post_id
order by p.created_at desc;

-- Create function to get user feed (posts from followed users)
create or replace function public.get_user_feed(user_uuid uuid)
returns table (
  id uuid,
  content text,
  image_url text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  author_id uuid,
  author_username text,
  author_display_name text,
  author_avatar_url text,
  like_count bigint,
  comment_count bigint,
  user_has_liked boolean
)
language sql
security definer
as $$
  select 
    pwd.*,
    case when ul.user_id is not null then true else false end as user_has_liked
  from public.posts_with_details pwd
  join public.follows f on pwd.author_id = f.following_id
  left join public.likes ul on pwd.id = ul.post_id and ul.user_id = user_uuid
  where f.follower_id = user_uuid
  order by pwd.created_at desc;
$$;

-- Create function to get profile stats
create or replace function public.get_profile_stats(profile_uuid uuid)
returns table (
  posts_count bigint,
  followers_count bigint,
  following_count bigint
)
language sql
security definer
as $$
  select 
    (select count(*) from public.posts where author_id = profile_uuid) as posts_count,
    (select count(*) from public.follows where following_id = profile_uuid) as followers_count,
    (select count(*) from public.follows where follower_id = profile_uuid) as following_count;
$$;
