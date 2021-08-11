import React from 'react';
import Card from '~/components/Card/Card';

import {lipsum} from '~/lib/lipsum';

export default function Work({slug, href, avatar, content, className, loading}){
  return (<>
      <Card className={className} slug={slug} href={href} avatar={avatar} content={content} loading={loading} />
      {lipsum(6).map( (text,i) => <p key={i}>{text}</p>)}
    </>)
}
